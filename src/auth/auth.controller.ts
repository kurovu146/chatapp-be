import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/constants';
import { UsersService } from 'src/users/users.service';
import { Prisma } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('register')
  async signUp(@Body() body: Prisma.UserCreateInput) {
    const { username } = body;
    const user = await this.userService.getUserByUsername(username);
    if (user) {
      throw new HttpException('Username already exists!', HttpStatus.CONFLICT);
    } 
    await this.userService.createUser(body);

    return {
      statusCode: 200,
      message: 'Sign-up successfully'
    }
  }
}