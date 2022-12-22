import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    private readonly eventService: EventsService,
    private readonly usersService: UsersService,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    const { eventId, userId } = createLikeDto;

    try {
      const event = await this.eventService.findOne(eventId);

      const user = await this.usersService.findOne(userId);

      const comment = this.likeRepository.create({
        event,
        user,
      });

      await this.likeRepository.save(comment);

      return comment;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByUser(userId: string) {
    try {
      const likes = await this.likeRepository.findAndCountBy({
        user: {
          id: userId,
        },
      });

      return likes;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number) {
    return `This action updates a #${id} like`;
  }

  async remove(removeLikeDto: RemoveLikeDto) {
    const { eventId, userId } = removeLikeDto;

    try {
      await this.likeRepository
        .createQueryBuilder('like')
        .delete()
        .where('event.id = :eventId AND user.id = :userId', { eventId, userId })
        .execute();

      return {
        status: HttpStatus.OK,
        message: `Like Removed on Event "${eventId}" from user "${userId}"`,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
