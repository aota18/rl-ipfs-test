import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { MediaCategory, MediaType } from '../../enums/media.enum';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class Media extends BaseEntity {
  @Column({
    default: MediaType.IMAGE,
  })
  type: MediaType;

  @Column({
    default: MediaCategory.EVENT_IMAGE,
  })
  category: MediaCategory;

  @ManyToOne(() => Event, (event) => event.medias)
  event: Event;

  @Column()
  url: string;

  @Column({
    nullable: true,
  })
  ext?: string;
}
