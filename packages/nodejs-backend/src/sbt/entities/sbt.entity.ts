import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { SBTStatus } from '../../enums/sbt.enum';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Sbt extends BaseEntity {
  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @Column({
    nullable: true,
  })
  airdropDt: number;

  @OneToOne(() => Event, (event) => event.sbt)
  @JoinColumn()
  event?: Event;

  @ManyToOne(() => User, (user) => user.sbts)
  owner: User;

  @Column({
    nullable: true,
  })
  tokenId: number;

  @Column({
    default: SBTStatus.CREATED,
  })
  status: SBTStatus;
}
