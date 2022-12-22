import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/user.entity';

@Entity()
export class Like extends BaseEntity {
  @ManyToOne(() => Event, (event) => event.likes)
  event: Event;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}
