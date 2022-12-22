import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './admin.entity';

@Injectable()
export class AdminAuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: Admin) {
    const payload = {
      username: user.username,
      roles: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '3d',
    });

    return { accessToken, username: user.username, roles: user.role };
  }
}
