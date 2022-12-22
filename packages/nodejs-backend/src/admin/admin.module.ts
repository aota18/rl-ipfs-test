import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminAuthService } from './admin-auth.service';
import { PassportModule } from '@nestjs/passport';
import { AccessControlModule } from 'nest-access-control';
import { JwtModule } from '@nestjs/jwt';
import { roles } from './admin.roles';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { EventsModule } from '../events/events.module';
import { TicketModule } from '../ticket/ticket.module';
import { SbtModule } from '../sbt/sbt.module';
import { GreetingModule } from '../greeting/greeting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    AccessControlModule.forRoles(roles),
    EventsModule,
    TicketModule,
    SbtModule,
    GreetingModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminAuthService],
  exports: [AdminService],
})
export class AdminModule {}
