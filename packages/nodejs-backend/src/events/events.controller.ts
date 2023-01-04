import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';
import { SearchOption } from '../interfaces/pagination.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'eventImgFiles', maxCount: 5 },
      { name: 'memoriesImgFiles', maxCount: 5 },
      { name: 'ticketImgFiles', maxCount: 1 },
      { name: 'sbtImgFiles', maxCount: 1 },
    ]),
  )
  async create(
    @User() user,
    @UploadedFiles() files: any,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.create(user, files, createEventDto);
  }

  // @Post('/relay-launch')
  // async relayLaunch(@Body() body) {
  //   return this.eventsService.relayLaunch(body);
  // }

  @Get('/')
  async findAll(@Query() options: SearchOption) {
    return this.eventsService.findAll(options);
  }

  @Get('/myevents')
  @UseGuards(JwtAuthGuard)
  async findMyEvents(
    @User() user,
    @Query('search') search: string,
    @Query() options: SearchOption,
  ) {
    return this.eventsService.findMyEvents(user, options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateEventDto) {
    return this.eventsService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
