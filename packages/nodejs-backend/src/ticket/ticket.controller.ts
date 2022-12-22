import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SearchOption } from '../interfaces/pagination.interface';
import { User } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermitStatus, TicketStatus } from '../enums/ticket.enum';

@Controller('ticket')
export class TicketController {
  private logger: Logger = new Logger(TicketController.name);
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(user, createTicketDto);
  }

  @Get()
  findAll(@User() user, @Query() options: SearchOption) {
    return this.ticketService.findAll(user, options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Get('attendees/:id')
  attendees(@Param('id') id: string, @Query() options: SearchOption) {
    return this.ticketService.findTicketAttendees(id, options);
  }

  @Get('holders/:id')
  holders(@Param('id') id: string) {
    return this.ticketService.findTicketHolders(id);
  }

  @Patch('request/:id')
  approveRequest(@Param('id') id: string) {
    return this.ticketService.updateTicketPermissionStatus(
      id,
      PermitStatus.REQUESTED,
    );
  }

  @Patch('verify/:id')
  verify(@Param('id') id: string) {
    return this.ticketService.updateTicketPermissionStatus(
      id,
      PermitStatus.APPROVED,
    );
  }

  @Patch('deny/:id')
  deny(@Param('id') id: string) {
    return this.ticketService.updateTicketPermissionStatus(
      id,
      PermitStatus.DENIED,
    );
  }

  @Patch('use/:id')
  use(@Param('id') id: string) {
    return this.ticketService.updateTicketStatus(id, TicketStatus.USED);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
