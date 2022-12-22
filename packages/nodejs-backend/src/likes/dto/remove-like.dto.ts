import { PartialType } from '@nestjs/swagger';
import { CreateLikeDto } from './create-like.dto';

export class RemoveLikeDto extends PartialType(CreateLikeDto) {
  eventId: string;
  userId: string;
}
