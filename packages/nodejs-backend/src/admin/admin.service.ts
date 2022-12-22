import {
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

import { Repository } from 'typeorm';
import { Status } from '../enums/event.enum';
import { SBTStatus } from '../enums/sbt.enum';
import { EventsService } from '../events/events.service';
import { GreetingService } from '../greeting/greeting.service';
import { SbtService } from '../sbt/sbt.service';
import { TicketService } from '../ticket/ticket.service';
import { AdminAuthService } from './admin-auth.service';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private authService: AdminAuthService,
    private eventService: EventsService,
    private ticketService: TicketService,
    private sbtService: SbtService,
    private greetingService: GreetingService,
  ) {}

  async login(payload: { username: string; password: string }) {
    const { username, password } = payload;

    // find user
    const user = await this.adminRepository.findOneBy({
      username,
    });

    if (!user) {
      throw new NotAcceptableException('User not found');
    }

    // check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new NotAcceptableException('Wrong Password');
    }

    return await this.authService.login(user);
  }

  async register(payload: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) {
    const { username, email, password, role } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new Admin();
    user.username = username;
    user.email = email;
    user.role = role;
    user.password = hashPassword;

    return await user.save();
  }

  /*
        - [ ] New Events Today - Event
        - [ ] Total Tickets Sold - Tickets
        - [ ] Issued SBTs Today - SBT
        - [ ] Total Events - Event
        - [ ] SBT Created - SBT
        - [ ] Events Ongoing - Events
        - [ ] Total SBT Issued - SBT
        - [ ] New Greetings Today - Greeting
        - [ ] Total Greetings - Greeting
  */
  async getDashboardData() {
    try {
      const result: any = {};

      const today = moment().startOf('day');
      const tomorrow = moment().add(1, 'days').startOf('day');

      const newEventsToday = await this.eventService.findAll({
        from: today,
        to: tomorrow,
      });

      result.newEventsToday = newEventsToday.data.count;

      const totalEvents = await this.eventService.findAll({});

      result.totalEvents = totalEvents.data.count;

      const eventsOngoing = await this.eventService.findAll({
        status: Status.ONGOING,
      });

      result.eventsOngoing = eventsOngoing.data.count;

      const sbtsTotalIssued = await this.sbtService.findAll(null, {
        status: SBTStatus.DROPPED,
      });

      result.sbtsTotalIssued = sbtsTotalIssued.data.count;

      const sbtsTotalCreated = await this.sbtService.findAll(null, {
        status: SBTStatus.CREATED,
      });

      result.sbtsTotalCreated = sbtsTotalCreated.data.count;

      const sbtsIssuedToday = await this.sbtService.findAll(null, {
        from: today,
        to: tomorrow,
        //TODO: find updated
      });

      result.sbtsIssuedToday = sbtsIssuedToday;

      // TODO: Tickets Sold

      const greetingsTotalCreated = await this.greetingService.findAll({});

      result.greetingsTotalCreated = greetingsTotalCreated.data.count;

      const greetingsCreatedToday = await this.greetingService.findAll({
        fromDate: today,
        toDate: tomorrow,
      });

      result.greetingsCreatedToday = greetingsCreatedToday.data.count;

      return {
        status: HttpStatus.OK,
        message: '',
        data: result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      };
    }
  }
}
