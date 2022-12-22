import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { TicketType } from '../../enums/ticket.enum';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Event } from './event.entity';

@Entity()
export class Ticketmeta extends BaseEntity {
  @Column({
    default: TicketType.FREE,
  })
  type: TicketType;

  @Column({
    nullable: true,
  })
  ticketName: string;

  @Column()
  contractAddress: string;

  @Column()
  imgUrl: string;

  @Column({
    nullable: true,
  })
  ticketQuantity?: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  ticketPrice?: number;

  @Column()
  salesStartDt: number;

  @Column()
  salesEndDt: number;

  @OneToOne(() => Event, (event) => event.ticketMeta)
  @JoinColumn()
  event: Event;

  @OneToMany(() => Ticket, (ticket) => ticket.ticketMeta)
  tickets: Ticket[];
}
