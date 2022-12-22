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
import { SbtService } from './sbt.service';
import { CreateSbtDto } from './dto/create-sbt.dto';
import { UpdateSbtDto } from './dto/update-sbt.dto';
import { User } from '../auth/auth.decorator';
import { SearchOption } from '../interfaces/pagination.interface';

@Controller('sbt')
export class SbtController {
  constructor(private readonly sbtService: SbtService) {}

  @Post()
  create(@User() user, @Body() createSbtDto: CreateSbtDto) {
    return this.sbtService.create(user, createSbtDto);
  }

  @Get()
  findAll(@User() user, @Query() options: SearchOption) {
    return this.sbtService.findAll(user, options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sbtService.findOne(+id);
  }

  @Patch('burn/:id')
  burn(@Param('id') id: string) {
    return this.sbtService.burn(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSbtDto: UpdateSbtDto) {
    return this.sbtService.update(+id, updateSbtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sbtService.remove(+id);
  }
}
