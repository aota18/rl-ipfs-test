import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SearchOption } from '../interfaces/pagination.interface';
import { MediaService } from '../media/media.service';
import { UploadService } from '../services/upload.service';
import { User } from '../users/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketmeta } from './entities/ticketmeta.entity';
import { getTicketsLeft } from '../blockchain/transactions';
import { PermitStatus } from '../enums/ticket.enum';
import { UsersService } from '../users/users.service';
import { TicketService } from '../ticket/ticket.service';
import { Sbt } from '../sbt/entities/sbt.entity';
import { BaseOutput } from '../base/base-output.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(Ticketmeta)
    private ticketMetaRepository: Repository<Ticketmeta>,

    @InjectRepository(Sbt)
    private sbtRepository: Repository<Sbt>,

    private mediaService: MediaService,

    private readonly uploadService: UploadService,

    @Inject(forwardRef(() => TicketService))
    private readonly ticketService: TicketService,
  ) {}

  async create(user: User, files, createEventDto: CreateEventDto) {
    const { eventImgFiles, memoriesImgFiles, ticketImgFiles, sbtImgFiles } =
      files;
    const {
      ticketName,
      ticketType,
      ticketQuantity,
      ticketPrice,
      salesStartDt,
      salesEndDt,
      eventTitle,
      privacy,
      repeat,
      repeatEndDt,
      password,
      onOffline,
      eventAddress1,
      eventAddress2,
      eventStartDt,
      eventEndDt,
      description,
      category,
      sbtName,
      airdropDt,
      ticketContractAddress,
    } = createEventDto;

    try {
      /*
       * 1. Ticket Meta Create
       */

      /* Event Create */
      const eventId = uuidv4();

      let ticketMeta;
      const ticketMetaCreatePromise = new Promise((resolve, reject) => {
        const ticketImgUrls = [];

        if (ticketImgFiles) {
          const ticketImgUploadRequests = ticketImgFiles.map(
            (file, id) =>
              new Promise((resolve) => {
                const fileName = `event/${eventId}/ticket/${file.originalname}`;
                this.uploadService
                  .addEventImage(file.buffer, fileName)
                  .then((img) => {
                    this.logger.debug(`Ticket image saved to ${img.Location}`);
                    ticketImgUrls.push(img.Location);
                    resolve(1);
                  });
              }),
          );

          Promise.all(ticketImgUploadRequests).then(async () => {
            this.logger.debug('start to create');
            /* Ticket Meta Create */
            ticketMeta = this.ticketMetaRepository.create({
              ticketName: ticketName,
              contractAddress: ticketContractAddress,
              ticketQuantity: +ticketQuantity,
              ticketPrice: +ticketPrice,
              type: ticketType,
              imgUrl: ticketImgUrls[0],
              salesStartDt: +salesStartDt,
              salesEndDt: +salesEndDt,
            });

            resolve('ticket Done');
          });
        }
      });

      /*
       * 2. SBT Meta Create
       */

      let sbt;

      const sbtCreatePromise = new Promise((resolve, reject) => {
        const sbtImgUrls = [];

        if (sbtImgFiles) {
          const sbtImgUploadRequests = sbtImgFiles.map(
            (file, id) =>
              new Promise((resolve, reject) => {
                const fileName = `event/${eventId}/sbt/${file.originalname}`;
                this.uploadService
                  .addEventImage(file.buffer, fileName)
                  .then((img) => {
                    this.logger.debug(`SBT image saved to ${img.Location}`);
                    sbtImgUrls.push(img.Location);
                    resolve(1);
                  });
              }),
          );

          Promise.all(sbtImgUploadRequests).then(async () => {
            this.logger.debug('start to create');
            /* Ticket Meta Create */
            sbt = this.sbtRepository.create({
              name: sbtName,
              imgUrl: sbtImgUrls[0],
              airdropDt: +airdropDt,
              owner: user,
            });

            resolve('sbt done');
          });
        }
      });

      /*
       * 3. Media (Event Images) Create
       */

      let newEvent;
      await Promise.all([ticketMetaCreatePromise, sbtCreatePromise]).then(
        async () => {
          newEvent = this.eventRepository.create({
            id: eventId,
            ticketMeta: ticketMeta,
            sbt: sbt,
            host: user,
            title: eventTitle,
            privacy,
            repeat,
            repeatEndDt: repeatEndDt ? +repeatEndDt : null,
            password,
            onOffline,
            eventAddress1,
            eventAddress2,
            eventStartDt: +eventStartDt,
            eventEndDt: +eventEndDt,
            description,
            category,
          });

          if (eventImgFiles.length) {
            eventImgFiles.forEach(async (file, id) => {
              const fileName = `event/${eventId}/${file.originalname}`;
              const img = await this.uploadService.addEventImage(
                file.buffer,
                fileName,
              );
              const url = img.Location;

              await this.mediaService.create(newEvent, url);

              this.logger.debug(`${fileName} created`);
            });
          }

          await this.eventRepository.save(newEvent);
        },
      );

      return newEvent;
    } catch (err) {
      this.logger.error(err);
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll({ page, limit, from, to, status }: SearchOption) {
    const offset = (page - 1) * limit;
    try {
      const query = this.eventRepository.createQueryBuilder('e');

      query.leftJoinAndSelect('e.host', 'host');
      query.leftJoinAndSelect('e.medias', 'medias');
      query.leftJoinAndSelect('e.ticketMeta', 'ticketMeta');
      query.leftJoinAndSelect('e.sbt', 'sbtMeta');
      if (from) {
        query.where('e.createdAt >=:from', { from: from });
      }

      if (to) {
        query.andWhere('e.createdAt <=:to', { to: to });
      }

      if (status) {
        query.andWhere('e.status = :status', { status: status });
      }
      if (page && limit) {
        query.take(limit).skip(offset);
      }

      const results = await query.getManyAndCount();
      return {
        status: HttpStatus.OK,
        message: '',
        data: {
          items: results[0],
          count: results[1],
        },
      };
    } catch (err) {
      this.logger.error(err);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      };
    }
  }

  async findMyEvents(user, { page, limit }: SearchOption): Promise<BaseOutput> {
    const offset = (page - 1) * limit;

    try {
      const query = this.eventRepository.createQueryBuilder('e');

      query.where('e.hostId = :userId', { userId: user.id });
      query.leftJoinAndSelect('e.host', 'host');
      query.leftJoinAndSelect('e.medias', 'medias');
      query.leftJoinAndSelect('e.ticketMeta', 'ticketMeta');
      query.leftJoinAndSelect('e.sbtMeta', 'sbtMeta');
      query.take(limit).skip(offset);

      const results = await query.getManyAndCount();

      return {
        status: HttpStatus.OK,
        message: '',
        data: {
          items: results[0],
          count: results[1],
        },
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      };
    }
  }

  /* 
  TODO: Search Keyword 
  */
  async searchFor({ search, page, limit }: SearchOption) {
    const offset = (page - 1) * limit;
    try {
      const [items, count] = await this.eventRepository.findAndCount({
        order: { id: 'ASC' },
        skip: offset,
        take: limit,
      });

      return { items, count };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const event = await this.eventRepository.findOne({
        relations: {
          host: true,
          medias: true,
          ticketMeta: true,
          sbt: true,
        },
        where: { id: id },
      });

      const attendees = await this.ticketService.findTicketAttendees(id, {
        status: PermitStatus.APPROVED,
      });

      if (!event) {
        throw new EntityNotFoundError(Event, `Event "${id}" doesn't exist `);
      }

      //Get Contract Address Info
      const ticketsLeft = await getTicketsLeft(
        event.ticketMeta.contractAddress,
      );
      event.ticketMeta['ticketsLeft'] = ticketsLeft;
      event['numOfAttendees'] = attendees.count;

      return {
        status: HttpStatus.OK,
        message: '',
        data: event,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyEventPassword(id, password) {
    try {
      const event = await this.eventRepository.findOneBy({ id });

      if (event.password === password) return true;
      else return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  /* 
   TODO: Update Event 
  */
  async update(id: string, updateUserDto: UpdateEventDto) {
    return;
  }

  /* 
   TODO: Remove Event 
  */
  async remove(id: string) {
    return;
  }
}
