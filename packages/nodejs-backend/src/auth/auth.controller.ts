import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilter } from '../controllers/file-helper';
import { CreateUserInput } from '../users/dto/create-user-input.dto';
import { User } from './auth.decorator';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private logger: Logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() req) {
    console.log(req);
    return this.authService.login(req);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@User() user) {
    return this.authService.me(user);
  }

  @Get('/hasAccount/:walletAddr')
  async hasAccount(@Param('walletAddr') walletAddr) {
    return this.authService.hasAccount(walletAddr);
  }

  @Post('/authorize')
  async authorize(@Body() req) {
    return this.authService.authorize(req);
  }

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('profileImg', {
      fileFilter: imageFilter,
    }),
  )
  async signup(@UploadedFile() file: any, @Body() body: CreateUserInput) {
    return this.authService.signup(file, body);
  }

  @Post('/signupGuest')
  async signupGuest(@Body() body) {
    return this.authService.signupGuest(body);
  }
}
