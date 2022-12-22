import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly eventService: EventsService,
    private readonly usersService: UsersService,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const { eventId, userId, text } = createCommentDto;

    try {
      const event = await this.eventService.findOne(eventId);

      const user = await this.usersService.findOne(userId);

      const comment = this.commentRepository.create({
        event,
        user,
        text,
      });

      await this.commentRepository.save(comment);

      return comment;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByUser(userId: string) {
    try {
      const comments = await this.commentRepository.findAndCountBy({
        user: {
          id: userId,
        },
      });

      return comments;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
