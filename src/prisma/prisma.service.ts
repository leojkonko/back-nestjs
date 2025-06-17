import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// Extends PrismaClient to expose full Prisma API while integrating with NestJS lifecycle
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Lifecycle hook triggered once the module has been initialized
  // Ensures database connection is established when the service is bootstrapped
  async onModuleInit() {
    await this.$connect(); // Initiate connection to the database
  }
}
