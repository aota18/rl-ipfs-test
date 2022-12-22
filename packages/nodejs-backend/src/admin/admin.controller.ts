import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ACGuard } from 'nest-access-control';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.adminService.login(dto);
  }

  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    console.log(dto);
    return await this.adminService.register(dto);
  }

  @HttpCode(200)
  @Get('dashboard')
  async getDashboardData() {
    return await this.adminService.getDashboardData();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, ACGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
