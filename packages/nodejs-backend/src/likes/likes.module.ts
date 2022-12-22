import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';

@Module({
  imports: [EventsModule, UsersModule, TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
