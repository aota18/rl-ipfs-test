import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { User } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';
import { SearchOption } from '../interfaces/pagination.interface';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  async create(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationsService.create(createInvitationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@User() user, @Query() options: SearchOption) {
    return this.invitationsService.findAllInviteds(user, options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ) {
    return this.invitationsService.approveInvitation(id, updateInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(+id);
  }
}
