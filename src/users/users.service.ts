import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService : PrismaService) {}
    async findOneByEmail(email: string): Promise <User | null> {
        return this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })
    }
    async findOneById(id: number): Promise <User | null> {
        return this.prismaService.user.findUnique({
            where: {
                id: id
            }
        })
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
            data
        })
    }
}
