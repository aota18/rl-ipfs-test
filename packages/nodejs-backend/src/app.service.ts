import { Injectable } from '@nestjs/common';
import deploy from './blockchain/deploy';
import { execute } from './blockchain/transactions';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async deploy() {
    try {
      deploy();
    } catch (err) {
      console.log(err);
    }
  }

  testContract() {
    execute();
  }
}
