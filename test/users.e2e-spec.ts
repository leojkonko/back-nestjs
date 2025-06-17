import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

describe('Users (e2e)', () => {
    let app: INestApplication;

    const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockUsersService = {
        create: jest.fn().mockResolvedValue(mockUser),
        findAll: jest.fn().mockResolvedValue([mockUser]),
        findOne: jest.fn().mockResolvedValue(mockUser),
        update: jest.fn().mockResolvedValue(mockUser),
        remove: jest.fn().mockResolvedValue(undefined),
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );
        app.setGlobalPrefix('api');

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /api/users', () => {
        it('should create a new user', () => {
            const createUserDto = {
                email: 'test@example.com',
                name: 'Test User',
            };

            return request(app.getHttpServer())
                .post('/api/users')
                .send(createUserDto)
                .expect(201)
                .expect((res) => {
                    expect(res.body.email).toBe(createUserDto.email);
                    expect(res.body.name).toBe(createUserDto.name);
                    expect(res.body.id).toBeDefined();
                });
        });

        it('should return 400 for invalid email', () => {
            const invalidUserDto = {
                email: 'invalid-email',
                name: 'Test User',
            };

            return request(app.getHttpServer())
                .post('/api/users')
                .send(invalidUserDto)
                .expect(400);
        });

        it('should return 400 for missing name', () => {
            const invalidUserDto = {
                email: 'test@example.com',
            };

            return request(app.getHttpServer())
                .post('/api/users')
                .send(invalidUserDto)
                .expect(400);
        });
    });

    describe('GET /api/users', () => {
        it('should return array of users', () => {
            return request(app.getHttpServer())
                .get('/api/users')
                .expect(200)
                .expect((res) => {
                    expect(Array.isArray(res.body)).toBe(true);
                });
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return user by id', () => {
            return request(app.getHttpServer())
                .get('/api/users/1')
                .expect(200)
                .expect((res) => {
                    expect(res.body.id).toBeDefined();
                    expect(res.body.email).toBeDefined();
                    expect(res.body.name).toBeDefined();
                });
        });

        it('should return 400 for invalid id', () => {
            return request(app.getHttpServer())
                .get('/api/users/invalid')
                .expect(400);
        });
    });

    describe('PATCH /api/users/:id', () => {
        it('should update user', () => {
            const updateDto = {
                name: 'Updated User',
                email: 'updated@example.com',
            };

            return request(app.getHttpServer())
                .patch('/api/users/1')
                .send(updateDto)
                .expect(200)
                .expect((res) => {
                    expect(res.body.id).toBeDefined();
                });
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete user', () => {
            return request(app.getHttpServer())
                .delete('/api/users/1')
                .expect(204);
        });
    });
});