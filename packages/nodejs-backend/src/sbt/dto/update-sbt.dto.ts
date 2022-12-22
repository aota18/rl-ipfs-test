import { PartialType } from '@nestjs/swagger';
import { CreateSbtDto } from './create-sbt.dto';

export class UpdateSbtDto extends PartialType(CreateSbtDto) {}
