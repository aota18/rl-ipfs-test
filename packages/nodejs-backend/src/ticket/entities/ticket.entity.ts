import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { PermitStatus, TicketStatus } from '../../enums/ticket.enum';
import { Event } from '../../events/entities/event.entity';
import { Ticketmeta } from '../../events/entities/ticketmeta.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Ticket extends BaseEntity {
  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @ManyToOne(() => Ticketmeta, (ticketMeta) => ticketMeta.tickets)
  ticketMeta: Ticketmeta;

  @ManyToOne(() => User, (user) => user.tickets)
  owner: User;

  @Column({
    default: TicketStatus.CREATED,
  })
  status: TicketStatus;

  @Column({
    default: PermitStatus.CREATED,
  })
  permission: PermitStatus;
}
