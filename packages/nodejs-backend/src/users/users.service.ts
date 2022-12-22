import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchOption } from '../interfaces/pagination.interface';
import { CreateUserInput } from './dto/create-user-input.dto';
import { CreateUserOutput } from './dto/create-user-output.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import { UpdateUserOutput } from './dto/update-user-output.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    const user = this.userRepository.create({
      ...createUserInput,
    });

    await this.userRepository.save(user);

    return {
      status: HttpStatus.OK,
      message: 'Successfully Created User!',
      data: user,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User id:"${id}" not found`);
    }

    return user;
  }

  async getUserByWalletAddr(walletAddr: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ walletAddr });
    return user;
  }

  async getUsersWithFilter(getUserFilter: GetUserFilterDto): Promise<User[]> {
    const { search } = getUserFilter;

    const query = this.userRepository.createQueryBuilder('user');

    if (search) {
      query.where(
        'LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.lastName) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const users = await query.getMany();

    return users;
  }

  async getAllUsers({ page, limit }: SearchOption) {
    const offset = (page - 1) * limit;

    try {
      const [items, count] = await this.userRepository.findAndCount({
        order: { id: 'ASC' },
        skip: offset,
        take: limit,
      });

      return { items, count };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: `User '${id}' was not found.`,
        };
      }

      await this.userRepository.save({
        ...user,
        ...updateUserInput,
        isGuest: false,
      });

      return {
        status: HttpStatus.OK,
        message: `User '${id}' was successfully updated!`,
        data: user,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }
}
