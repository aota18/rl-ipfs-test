import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GreetingService } from './greeting.service';
import { GreetingController } from './greeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Greeting } from './entities/greeting.entity';
import { UploadService } from '../services/upload.service';
import { FileService } from '../services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Greeting]), HttpModule],
  controllers: [GreetingController],
  providers: [GreetingService, UploadService, FileService],
  exports: [GreetingService],
})
export class GreetingModule {}
