import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    await this.cacheManager.set(`user:${user.id}`, user, 300);
    await this.cacheManager.del('users:all');

    return user;
  }

  async findAll(): Promise<User[]> {
    const cachedUsers = await this.cacheManager.get<User[]>('users:all');
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    await this.cacheManager.set('users:all', users, 300);

    return users;
  }

  async findOne(id: number): Promise<User> {
    const cachedUser = await this.cacheManager.get<User>(`user:${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.cacheManager.set(`user:${id}`, user, 300);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    await this.cacheManager.set(`user:${id}`, updatedUser, 300);
    await this.cacheManager.del('users:all');

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });

    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del('users:all');
  }
}
