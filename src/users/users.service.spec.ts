import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let cacheManager: any;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      mockPrismaService.user.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
      expect(cacheManager.set).toHaveBeenCalledWith(
        `user:${mockUser.id}`,
        mockUser,
        300,
      );
      expect(cacheManager.del).toHaveBeenCalledWith('users:all');
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return cached users if available', async () => {
      const mockUsers = [mockUser];
      mockCacheManager.get.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(cacheManager.get).toHaveBeenCalledWith('users:all');
      expect(prismaService.user.findMany).not.toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should fetch users from database if not cached', async () => {
      const mockUsers = [mockUser];
      mockCacheManager.get.mockResolvedValue(null);
      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(cacheManager.get).toHaveBeenCalledWith('users:all');
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
      expect(cacheManager.set).toHaveBeenCalledWith(
        'users:all',
        mockUsers,
        300,
      );
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return cached user if available', async () => {
      mockCacheManager.get.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(cacheManager.get).toHaveBeenCalledWith('user:1');
      expect(prismaService.user.findUnique).not.toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should fetch user from database if not cached', async () => {
      mockCacheManager.get.mockResolvedValue(null);
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(cacheManager.get).toHaveBeenCalledWith('user:1');
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(cacheManager.set).toHaveBeenCalledWith('user:1', mockUser, 300);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockCacheManager.get.mockResolvedValue(null);
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('User with ID 999 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };
      const updatedUser = { ...mockUser, ...updateUserDto };

      mockCacheManager.get.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
      expect(cacheManager.set).toHaveBeenCalledWith('user:1', updatedUser, 300);
      expect(cacheManager.del).toHaveBeenCalledWith('users:all');
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete an existing user', async () => {
      mockCacheManager.get.mockResolvedValue(mockUser);

      await service.remove(1);

      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(cacheManager.del).toHaveBeenCalledWith('user:1');
      expect(cacheManager.del).toHaveBeenCalledWith('users:all');
    });
  });
});
