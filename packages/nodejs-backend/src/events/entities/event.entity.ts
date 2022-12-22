import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Category, Privacy, Repeat, Status } from '../../enums/event.enum';
import { Like } from '../../likes/entities/like.entity';
import { Media } from '../../media/entities/media.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Ticketmeta } from './ticketmeta.entity';
import { User } from '../../users/user.entity';
import { Sbt } from '../../sbt/entities/sbt.entity';

@Entity()
export class Event extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @ManyToOne(() => User, (user) => user.events)
  host: User;

  @OneToMany(() => Media, (media) => media.event)
  medias: Media[];

  @OneToMany(() => Comment, (comment) => comment.event)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.event)
  likes: Like[];

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  @OneToOne(() => Ticketmeta, (ticketMeta) => ticketMeta.event, {
    cascade: true,
  })
  ticketMeta: Ticketmeta;

  @OneToOne(() => Sbt, (sbt) => sbt.event, {
    cascade: true,
  })
  sbt: Sbt;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    default: Privacy.PUBLIC,
  })
  privacy: Privacy;

  @Column({
    default: Repeat.NEVER,
  })
  repeat: Repeat;

  @Column({
    nullable: true,
  })
  repeatEndDt?: number;

  @Column({
    nullable: true,
  })
  password?: string;

  @Column({
    nullable: true,
  })
  onOffline?: string;

  @Column({
    nullable: true,
  })
  eventAddress1: string;

  @Column({
    nullable: true,
  })
  eventAddress2: string;

  @Column()
  eventStartDt: number;

  @Column()
  eventEndDt: number;

  @Column()
  description: string;

  @Column()
  category: Category;

  @Column({
    default: Status.CREATED,
  })
  status: Status;

  @Column({
    default: false,
  })
  isPromoted?: boolean;
}
