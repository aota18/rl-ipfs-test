import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseOutput } from '../base/base-output.dto';
import { SBTStatus } from '../enums/sbt.enum';
import { SearchOption } from '../interfaces/pagination.interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateSbtDto } from './dto/create-sbt.dto';
import { UpdateSbtDto } from './dto/update-sbt.dto';
import { Sbt } from './entities/sbt.entity';

@Injectable()
export class SbtService {
  private logger: Logger = new Logger(SbtService.name);

  constructor(
    @InjectRepository(Sbt)
    private readonly sbtRepository: Repository<Sbt>,
    private readonly usersService: UsersService,
  ) {}
  async create(user: User, createSbtDto: CreateSbtDto) {
    const { tokenId, userId, name, imgUrl } = createSbtDto;

    try {
      let sbt;

      /* SBT Create at Sign Up Case Step */
      if (userId) {
        const user = await this.usersService.findOne(userId);

        sbt = await this.sbtRepository.create({
          name,
          imgUrl,
          status: SBTStatus.DROPPED,
          owner: user,
          tokenId,
        });

        /* SBT Create at Airdrop Case Step */
      } else {
        sbt = await this.sbtRepository.create({
          owner: user,
          tokenId,
        });
      }

      await this.sbtRepository.save(sbt);

      return {
        status: HttpStatus.OK,
        message: 'SBT was successfully created',
        data: sbt,
      };
    } catch (err) {
      this.logger.error(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
    return 'This action adds a new sbt';
  }

  async findAll(user: User, options: SearchOption) {
    const { page, limit, from, to, status } = options;

    const offset = (page - 1) * limit;

    try {
      const query = this.sbtRepository.createQueryBuilder('s');

      query.leftJoinAndSelect('s.owner', 'user');

      if (user) {
        query.where('s.ownerId = :userId', { userId: user.id });
      }

      if (from) {
        query.andWhere('s.createdAt >=:from', { from: from });
      }

      if (to) {
        query.andWhere('s.createdAt <=:to', { to: to });
      }

      if (status) {
        query.andWhere('s.status = :status', { status: status });
      }

      if (page && limit) {
        query.take(limit).skip(offset);
      }

      const results = await query.getManyAndCount();

      return {
        status: HttpStatus.OK,
        message: '',
        data: {
          items: results[0],
          count: results[1],
        },
      };
    } catch (err) {
      this.logger.error(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sbt`;
  }

  async burn(id: string): Promise<BaseOutput> {
    try {
      const sbt = await this.sbtRepository.findOneBy({ id });

      sbt.status = SBTStatus.BURNED;

      await this.sbtRepository.save(sbt);

      return {
        status: HttpStatus.OK,
        message: 'SBT was successfully burned!',
        data: sbt,
      };
    } catch (err) {
      this.logger.error(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      };
    }
  }

  update(id: number, updateSbtDto: UpdateSbtDto) {
    return `This action updates a #${id} sbt`;
  }

  remove(id: number) {
    return `This action removes a #${id} sbt`;
  }
}
