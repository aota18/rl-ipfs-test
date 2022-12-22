import { HttpStatus } from '@nestjs/common';

export class BaseOutput {
  status: HttpStatus;
  message: string;
  data?: any;
}
