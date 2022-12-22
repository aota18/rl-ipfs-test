import { Module } from '@nestjs/common';
import { SbtService } from './sbt.service';
import { SbtController } from './sbt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sbt } from './entities/sbt.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sbt]), UsersModule],
  controllers: [SbtController],
  providers: [SbtService],
  exports: [SbtService],
})
export class SbtModule {}
