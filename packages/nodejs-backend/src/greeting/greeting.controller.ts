import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GreetingService } from './greeting.service';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/update-greeting.dto';
import { User } from '../auth/auth.decorator';
import { SearchOption } from '../interfaces/pagination.interface';

@Controller('greeting')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Post('/free')
  freeMint(@Body() body) {
    return this.greetingService.freeMint(body);
  }

  @Post()
  create(@Body() createGreetingDto: CreateGreetingDto) {
    return this.greetingService.create(createGreetingDto);
  }

  @Get()
  findAll(@Query() option: SearchOption) {
    return this.greetingService.findAll(option);
  }

  @Get('test')
  test(@Query() query) {
    console.log('CHECK===1', query);
    return this.greetingService.test(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.greetingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGreetingDto: UpdateGreetingDto,
  ) {
    return this.greetingService.update(+id, updateGreetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.greetingService.remove(+id);
  }
}
