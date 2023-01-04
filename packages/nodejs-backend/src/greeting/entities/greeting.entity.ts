import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { CHAIN } from '../../enums/chain.enum';
import { User } from '../../users/user.entity';

@Entity()
export class Greeting extends BaseEntity {
  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  transactionId: string;

  @Column({
    nullable: true,
  })
  cloudinaryUrl: string;

  @Column({
    nullable: true,
  })
  shortUrl: string;

  @Column()
  imgUrl: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  chainId: CHAIN;
}
