import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SearchOption } from '../interfaces/pagination.interface';
import { CreateUserInput } from './dto/create-user-input.dto';
import { CreateUserOutput } from './dto/create-user-output.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /*
   * TODO : createUser
   */
  @Post('/create')
  async signUp(
    @Body() createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput);
  }

  /*
   * TODO : getUserById
   */
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /*
   * TODO : getUser By Wallet address
   */
  @Get('/:walletAddr')
  async findOneByWalletAddr(
    @Param('walletAddr') walletAddr: string,
  ): Promise<User> {
    return this.usersService.getUserByWalletAddr(walletAddr);
  }

  /*
   * TODO : getAllUsers
   */
  @Get('/')
  async findAll(
    @Query() getUserFilter: GetUserFilterDto,
    @Query() options: SearchOption,
  ) {
    if (Object.keys(getUserFilter).length) {
      // Get User with Filter
      return this.usersService.getUsersWithFilter(getUserFilter);
    } else {
      // Get All User
      return this.usersService.getAllUsers(options);
    }
  }

  /*
   * TODO : getAllUsersByFilters
   */

  /*
   * TODO : updateUser
   */

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.updateUser(id, updateUserInput);
  }

  /*
   * TODO : deleteUser
   */
}
