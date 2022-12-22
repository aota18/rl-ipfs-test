import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { InvitationStatus } from '../../enums/invitation.enum';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Invitation extends BaseEntity {
  @ManyToOne(() => User, (user) => user.invites)
  from: User;

  @ManyToOne(() => User, (user) => user.inviteds)
  to: User;

  @Column()
  eventId: string;

  @Column({
    default: InvitationStatus.REQUESTED,
  })
  status: InvitationStatus;
}
