import { forwardRef, Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MediaModule } from '../media/media.module';
import { UploadService } from '../services/upload.service';
import { FileService } from '../services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Ticketmeta } from './entities/ticketmeta.entity';
import { UsersModule } from '../users/users.module';
import { TicketModule } from '../ticket/ticket.module';
import { Sbt } from '../sbt/entities/sbt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Ticketmeta, Sbt]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MediaModule,
    UsersModule,
    forwardRef(() => TicketModule),
  ],
  controllers: [EventsController],
  providers: [EventsService, UploadService, FileService],
  exports: [EventsService],
})
export class EventsModule {}
