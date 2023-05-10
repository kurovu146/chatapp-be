import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { Prisma } from '@prisma/client';
import { Public } from 'src/shared/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() body: Prisma.UserCreateInput) {
    return this.usersService.createUser(body);
  }

  @Public()
  @Get()
  async getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(+id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: Prisma.UserUpdateInput) {
    return this.usersService.updateUser(+id, body);
  }
}
