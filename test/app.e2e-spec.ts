import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // Create testing module with AppController and AppService
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // Create Nest application instance from the compiled module
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    // Clean up and close the app after each test
    await app.close();
  });

  it('/ (GET) should return "Hello World!"', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
