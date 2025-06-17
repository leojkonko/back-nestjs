import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Load environment variables globally and make available throughout the app
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configure global cache using Redis for distributed caching with TTL of 5 minutes
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || undefined,
      ttl: 300, // cache expiration in seconds
    }),

    // Feature module encapsulating user-related controllers and services
    UsersModule,
  ],
  controllers: [AppController], // Root controller handling basic routes
  providers: [
    AppService, // Root service providing core app logic

    // Apply global validation pipe to all incoming requests for DTO validation and sanitization
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
