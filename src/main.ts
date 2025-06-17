import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the Nest application instance from the root module
  const app = await NestFactory.create(AppModule);

  // Enable and configure CORS to allow specified origins and HTTP methods,
  // supporting credentials for secure cookie/session handling.
  // This whitelist approach enhances security by limiting allowed origins.
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Apply global validation pipe to:
  // - whitelist: strip any properties not in DTOs
  // - forbidNonWhitelisted: throw error on unexpected properties to prevent silent failures
  // - transform: automatically convert payloads to DTO instances (type-safe)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Prefix all routes with '/api' for consistent API versioning and namespace separation
  app.setGlobalPrefix('api');

  // Determine port from environment variable or default to 3000
  const port = process.env.PORT || 3000;

  // Start listening on the configured port
  await app.listen(port);

  // Log URLs for quick reference during development
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(
    `📚 API Endpoints available at: http://localhost:${port}/api/users`,
  );
}
bootstrap();
