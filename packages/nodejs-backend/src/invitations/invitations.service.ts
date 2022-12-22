import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationStatus } from '../enums/invitation.enum';
import { Event } from '../events/entities/event.entity';
import { EventsService } from '../events/events.service';
import { SearchOption } from '../interfaces/pagination.interface';
import { UsersService } from '../users/users.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity';

@Injectable()
export class InvitationsService {
  logger = new Logger(InvitationsService.name);

  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
    private readonly userService: UsersService,
    private readonly eventService: EventsService,
  ) {}
  async create(createInvitationDto: CreateInvitationDto) {
    const { from, to, eventId } = createInvitationDto;

    try {
      const fromUser = await this.userService.findOne(from);

      const toUser = await this.userService.findOne(to);

      const invitation = this.invitationRepository.create({
        from: fromUser,
        to: toUser,
        eventId: eventId,
      });

      await this.invitationRepository.save(invitation);

      return {
        status: HttpStatus.OK,
        message: 'Invitation created successfully!',
        data: invitation,
      };
    } catch (err) {
      this.logger.error(err.message);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Invitation cannot be created!',
        data: {},
      };
    }
  }

  async findAllInviteds(user, { page, limit }: SearchOption) {
    const offset = (page - 1) * limit;

    try {
      const query = this.invitationRepository.createQueryBuilder('i');
      query.where('i.toId=:userId', { userId: user.id });
      query.andWhere('i.status=:status', { status: 'REQUESTED' });
      query.leftJoinAndMapOne(
        'i.eventId',
        Event,
        'event',
        'i.eventId=event.id::text',
      );
      query.leftJoinAndSelect('event.medias', 'medias');
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
      this.logger.error(err.message);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  findAll() {
    return `This action returns all invitations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  async approveInvitation(
    id: string,
    updateInvitationDto: UpdateInvitationDto,
  ) {
    const { eventId, password } = updateInvitationDto;

    try {
      // Check Password of Event

      if (
        !password ||
        !(await this.eventService.verifyEventPassword(eventId, password))
      ) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Check your password please.',
        };
      }

      const invitation = await this.invitationRepository.findOneBy({ id });
      invitation.status = InvitationStatus.APPROVED;

      await this.invitationRepository.save(invitation);

      return {
        status: HttpStatus.OK,
        message: 'Invitation updated successfully',
      };
    } catch (err) {
      this.logger.error(err.message);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
