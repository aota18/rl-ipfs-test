import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  walletAddr: string;
}
