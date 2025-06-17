import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// Root controller responsible for handling the base route '/'
export class AppController {
  // Inject AppService to delegate business logic
  constructor(private readonly appService: AppService) {}

  // Handle HTTP GET requests to '/'
  @Get()
  getHello(): string {
    // Delegate response generation to AppService
    return this.appService.getHello();
  }
}
