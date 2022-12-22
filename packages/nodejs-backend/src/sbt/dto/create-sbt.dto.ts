import { BaseEntity, Column, ManyToOne } from 'typeorm';
import { SBTStatus } from '../../enums/sbt.enum';
import { User } from '../../users/user.entity';

export class CreateSbtDto extends BaseEntity {
  name?: string;
  imgUrl?: string;
  tokenId: number;
  userId?: string;
}
