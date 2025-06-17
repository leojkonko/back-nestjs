import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  // Setup the testing module and initialize controller before each test
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Declare controller under test
      providers: [AppService], // Provide dependencies for injection
    }).compile();

    // Resolve controller instance from DI container
    appController = app.get<AppController>(AppController);
  });

  // Group of tests for the root endpoint
  describe('root', () => {
    // Test expected return value of getHello() method
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
