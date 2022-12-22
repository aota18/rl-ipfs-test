import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => Event, (event) => event.comments)
  event: Event;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  text: string;
}
