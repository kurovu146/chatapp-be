import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async createUser(body: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data: body });
  }

  async getAllUser() {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id
      }
    })
  }

  async getUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username
      }
    })
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where: { id },
      data
    });
  }
}
