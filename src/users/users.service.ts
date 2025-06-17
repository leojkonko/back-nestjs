import {
  Injectable,
  NotFoundException,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
// UsersService encapsulates core business logic related to user management
export class UsersService {
  constructor(
    private prisma: PrismaService, // Prisma ORM service for DB operations
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Injected caching layer to optimize data retrieval
  ) {}

  // Creates a new user and updates cache accordingly
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });

      // Cache the newly created user and invalidate the cached users list
      await this.cacheManager.set(`user:${user.id}`, user, 300);
      await this.cacheManager.del('users:all');

      return user;
    } catch (error) {
      // Handle Prisma unique constraint error for email
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A user with this email already exists');
      }
      // Re-throw any other errors
      throw error;
    }
  }

  // Retrieves all users, utilizing cache to minimize database hits
  async findAll(): Promise<User[]> {
    const cachedUsers = await this.cacheManager.get<User[]>('users:all');
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' }, // Ensures most recent users appear first
    });

    await this.cacheManager.set('users:all', users, 300);

    return users;
  }

  // Retrieves a specific user by ID, using cache when available
  async findOne(id: number): Promise<User> {
    const cachedUser = await this.cacheManager.get<User>(`user:${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      // Gracefully handle case when user doesn't exist
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.cacheManager.set(`user:${id}`, user, 300);

    return user;
  }

  // Updates user details and syncs the cache
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id); // Ensures user exists before attempting update

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    await this.cacheManager.set(`user:${id}`, updatedUser, 300);
    await this.cacheManager.del('users:all'); // Invalidate users list cache

    return updatedUser;
  }

  // Deletes a user and cleans up related cache entries
  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensures user exists before deletion

    await this.prisma.user.delete({
      where: { id },
    });

    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del('users:all');
  }
}
