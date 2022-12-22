import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseOutput } from '../base/base-output.dto';
import { SearchOption } from '../interfaces/pagination.interface';
import { getFileFromURL } from '../utils/file';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/update-greeting.dto';
import { Greeting } from './entities/greeting.entity';
import { Blob } from 'buffer';
import { UploadService } from '../services/upload.service';

@Injectable()
export class GreetingService {
  logger = new Logger(GreetingService.name);
  constructor(
    @InjectRepository(Greeting)
    private readonly greetingRepository: Repository<Greeting>,
    private readonly httpService: HttpService,
    private readonly uploadService: UploadService,
  ) {}
  async create(createGreetingDto: CreateGreetingDto): Promise<BaseOutput> {
    const { from, to, description, imgUrl, transactionId } = createGreetingDto;

    try {
      // ImgUrl to File Buffer
      const response = await this.httpService.axiosRef.get(imgUrl, {
        responseType: 'arraybuffer',
      });
      const fileName = `greetings/${transactionId}`;
      const buffer = Buffer.from(response.data, 'utf-8');

      const img = await this.uploadService.addEventImage(buffer, fileName);

      const greeting = this.greetingRepository.create({
        from,
        to,
        description,
        cloudinaryUrl: imgUrl,
        imgUrl: img.Location,
        transactionId,
      });

      await this.greetingRepository.save(greeting);

      return {
        status: HttpStatus.OK,
        message: 'Greeting created successfullly',
        data: greeting,
      };
    } catch (err) {
      this.logger.error(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      };
    }
  }

  async findAll({
    page,
    limit,
    from,
    to,
    fromDate,
    toDate,
  }: SearchOption): Promise<BaseOutput> {
    const offset = (page - 1) * limit;

    try {
      const query = this.greetingRepository.createQueryBuilder('g');

      if (from) {
        query.where('g.from=:userAddress', { userAddress: from });
      }

      if (to) {
        query.where('g.to=:userAddress', { userAddress: to });
      }

      if (fromDate) {
        query.andWhere('g.createdAt >=:from', { from: fromDate });
      }

      if (toDate) {
        query.andWhere('g.createdAt <=:to', { to: toDate });
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
      this.logger.error(err.message);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} greeting`;
  }

  update(id: number, updateGreetingDto: UpdateGreetingDto) {
    return `This action updates a #${id} greeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} greeting`;
  }
}
