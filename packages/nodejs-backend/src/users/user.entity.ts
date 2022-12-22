import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Country } from '../enums/country.enum';
import { GENDER, MARRIED_STATUS } from '../enums/user.enum';
import { Event } from '../events/entities/event.entity';
import { Invitation } from '../invitations/entities/invitation.entity';
import { Like } from '../likes/entities/like.entity';
import { Sbt } from '../sbt/entities/sbt.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  walletAddr: string;

  @Column({ default: 1 })
  chainId: number;

  @Column({
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  profileURL?: string;

  @Column({
    nullable: true,
  })
  nationality: Country;

  @Column({
    nullable: true,
  })
  birthday: number;

  @Column({
    nullable: true,
  })
  companyAddress1?: string;

  @Column({
    nullable: true,
  })
  companyAddress2?: string;

  @Column({
    nullable: true,
  })
  twitterHandle?: string;

  @Column({
    nullable: true,
  })
  gender?: GENDER;

  @Column({
    default: MARRIED_STATUS.NO,
  })
  married: MARRIED_STATUS;

  @Column({
    nullable: true,
  })
  marriageDt: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isReported: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ default: true })
  isGuest: boolean;

  @Column({
    nullable: true,
  })
  ens?: string;

  @OneToMany(() => Event, (event) => event.host)
  events: Event[];

  @OneToMany(() => Ticket, (ticket) => ticket.owner)
  tickets: Ticket[];

  @OneToMany(() => Sbt, (sbt) => sbt.owner)
  sbts: Sbt[];

  @OneToMany(() => Invitation, (invitation) => invitation.from)
  invites: Invitation[];

  @OneToMany(() => Invitation, (invitation) => invitation.to)
  inviteds: Invitation[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (comment) => comment.user)
  likes: Like[];
}
