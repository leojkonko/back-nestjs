import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  // Registers the controller responsible for handling incoming requests
  controllers: [UsersController],

  // Registers providers (services) that contain business logic and shared resources
  providers: [UsersService, PrismaService],

  // Exports the UsersService for use in other modules (e.g., AuthModule)
  exports: [UsersService],
})
// Declares the UsersModule, encapsulating controller and service logic for user operations
export class UsersModule {}
