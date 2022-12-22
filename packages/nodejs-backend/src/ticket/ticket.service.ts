import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermitStatus, TicketStatus } from '../enums/ticket.enum';
import { Event } from '../events/entities/event.entity';
import { EventsService } from '../events/events.service';
import { SearchOption } from '../interfaces/pagination.interface';
import { Media } from '../media/entities/media.entity';
import { User } from '../users/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import * as moment from 'moment';

@Injectable()
export class TicketService {
  private logger: Logger = new Logger(TicketService.name);
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @Inject(forwardRef(() => EventsService))
    private readonly eventService: EventsService,
  ) {}
  async create(user: User, createTicketDto: CreateTicketDto) {
    const { eventId } = createTicketDto;

    try {
      const event: Event = await this.eventService.findOne(eventId);

      const ticket = this.ticketRepository.create({
        owner: user,
        event,
        ticketMeta: event.ticketMeta,
        ...createTicketDto,
      });

      await this.ticketRepository.save(ticket);

      return ticket;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Create Ticket Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    user,
    { search, page, limit, from, to, previous }: SearchOption,
  ) {
    const offset = (page - 1) * limit;

    try {
      const query = await this.ticketRepository.createQueryBuilder('t');

      if (search) {
        query.where('LOWER(t.title) LIKE LOWER(:search)', {
          search: `%${search}%`,
        });
      }

      query.leftJoinAndSelect('t.owner', 'user');
      query.leftJoinAndSelect('t.event', 'event');
      query.leftJoinAndSelect('event.medias', 'medias');
      query.leftJoinAndSelect('t.ticketMeta', 'ticketMeta');

      if (from) {
        query.andWhere('event.eventStartDt >= :from', { from });
      }

      if (previous) {
        query.andWhere(`event.eventEndDt <= :now`, { now: moment().unix() });
      }

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
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const ticket = await this.ticketRepository.findOneBy({ id });

      if (!ticket) {
        throw new HttpException(`Ticket ${id} Not Found`, HttpStatus.NOT_FOUND);
      }

      return ticket;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTicketPermissionStatus(id, status: PermitStatus) {
    try {
      const ticket = await this.ticketRepository.findOneBy({ id });

      if (!ticket) {
        throw new HttpException('Ticket Not Found', HttpStatus.NOT_FOUND);
      }

      if (status === PermitStatus.APPROVED) {
        ticket.status = TicketStatus.USED;
      }

      ticket.permission = status;

      await this.ticketRepository.save(ticket);

      return {
        status: HttpStatus.OK,
        msg: `Successfully ${status.toLowerCase()}`,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTicketStatus(ticketId, status: TicketStatus) {
    try {
      const ticket = await this.ticketRepository.findOneBy({ id: ticketId });

      if (!ticket) {
        throw new HttpException('Ticket Not Found', HttpStatus.NOT_FOUND);
      }

      ticket.status = status;

      await this.ticketRepository.save(ticket);

      return {
        status: HttpStatus.OK,
        msg: `Successfully ${status.toLowerCase()}`,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findTicketAttendees(eventId, options: SearchOption) {
    const { status } = options;

    try {
      const query = await this.ticketRepository.createQueryBuilder('t');

      query.where('t.eventId=:eventId', { eventId });
      query.leftJoinAndSelect('t.owner', 'user');

      if (status) {
        query.andWhere('permission=:status', {
          status,
        });
      }

      const results = await query.getManyAndCount();

      return {
        items: results[0],
        count: results[1],
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findTicketHolders(eventId) {
    try {
      const query = await this.ticketRepository.createQueryBuilder('t');

      query.where('t.eventId=:eventId', { eventId });
      query.leftJoinAndSelect('t.owner', 'user');
      query.andWhere('status=:status1', {
        status1: PermitStatus.CREATED,
      });

      const results = await query.getManyAndCount();

      return {
        items: results[0],
        count: results[1],
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
