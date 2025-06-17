import { Injectable } from '@nestjs/common';

@Injectable()
// Core service responsible for application-wide business logic.
// Currently provides a simple greeting message.
export class AppService {
  // Returns a static greeting string.
  // This method can be extended in the future to include more complex logic.
  getHello(): string {
    return 'Hello World!';
  }
}
