import { PartialType } from '@nestjs/swagger';
import { CreateInvitationDto } from './create-invitation.dto';

export class UpdateInvitationDto extends PartialType(CreateInvitationDto) {
  eventId: string;
  password?: string;
}
