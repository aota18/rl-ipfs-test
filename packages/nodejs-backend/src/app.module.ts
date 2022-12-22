import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadService } from './services/upload.service';
import { FileService } from './services/file.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { EventsModule } from './events/events.module';
import { MediaModule } from './media/media.module';
import { DatabaseModule } from './database/database.module';
import { TicketModule } from './ticket/ticket.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { SbtModule } from './sbt/sbt.module';
import { InvitationsModule } from './invitations/invitations.module';
import { GreetingModule } from './greeting/greeting.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AdminModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventsModule,
    TicketModule,
    MediaModule,
    CommentsModule,
    LikesModule,
    SbtModule,
    InvitationsModule,
    GreetingModule,
  ],
  controllers: [AppController],
  providers: [AppService, UploadService, FileService],
})
export class AppModule {}
