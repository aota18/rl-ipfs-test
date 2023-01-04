import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseOutput } from '../base/base-output.dto';
import { SearchOption } from '../interfaces/pagination.interface';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/update-greeting.dto';
import { Greeting } from './entities/greeting.entity';
import { UploadService } from '../services/upload.service';
import { URLService } from '../services/url.service';
import { readFileSync } from 'fs';
import * as path from 'path';
import sendRelay from '../blockchain/relay';

@Injectable()
export class GreetingService {
  logger = new Logger(GreetingService.name);
  constructor(
    @InjectRepository(Greeting)
    private readonly greetingRepository: Repository<Greeting>,
    private readonly httpService: HttpService,
    private readonly uploadService: UploadService,
    private readonly urlService: URLService,
  ) {}
  async create(createGreetingDto: CreateGreetingDto): Promise<BaseOutput> {
    const { from, to, description, imgUrl, transactionId, chainId } =
      createGreetingDto;

    try {
      /* imgUrl Error */
      if (!imgUrl) {
        throw new Error('No Image URL to shorten.');
      }

      /* ImgUrl to File Buffer */
      const response = await this.httpService.axiosRef.get(imgUrl, {
        responseType: 'arraybuffer',
      });
      const fileName = `greetings/${transactionId}`;
      const buffer = Buffer.from(response.data, 'utf-8');
      const img = await this.uploadService.addEventImage(buffer, fileName);

      /* Get Shortened URL */
      const shortnedURLObj = await this.urlService.getShortenedURL(
        img.Location,
      );

      const greeting = this.greetingRepository.create({
        from,
        to,
        description,
        cloudinaryUrl: imgUrl,
        imgUrl: img.Location,
        shortUrl: shortnedURLObj.url.shortLink,
        transactionId,
        chainId,
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
        message: err.message,
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

  async testRelay(tx) {
    await sendRelay(tx);
    console.log('RELAYED');
    return 'Relayed';
  }

  async freeMint(body) {
    try {
      const gcFile: any = readFileSync(
        path.join(__dirname, '../blockchain/contracts/GreetingCard.json'),
      );

      const greetingCard = JSON.parse(gcFile);

      const GC_CONTRACT_ADDRESS = '0x26e8BAb22a311Ce7b55DFa7da8af0FE4443A2c4d';

      const Web3 = require('web3');
      const web3 = new Web3();
      const gcContract = new web3.eth.Contract(
        greetingCard.abi,
        GC_CONTRACT_ADDRESS,
      );
      const data = gcContract.methods
        .safeMint('0x5C1C6B6FfB5A2b484B7B1dA97A407a8238ccA05f', 'abcde')
        .encodeABI();

      const tx = {
        to: GC_CONTRACT_ADDRESS,
        value: '0x00',
        gasLimit: 21000,
        data: data,
        speed: 'fast',
      };

      const result = await sendRelay(tx);

      console.log('====CHECK1====', result);

      return {
        status: HttpStatus.OK,
        message: '',
        data: result,
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

  async test(query) {
    console.log(query);

    try {
      return {
        status: HttpStatus.OK,
        error: '',
        data: 'test',
      };
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
