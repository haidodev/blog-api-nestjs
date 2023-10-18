import { BadRequestException, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) { }
    async create(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prismaService.post.create({ data })
    }
    async findAll(): Promise<Post[]> {
        return await this.prismaService.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        gender: true,
                    }
                }
            }
        });
    }
    async findOne(id): Promise<Post> {
        return await this.prismaService.post.findUnique({
            where: {
                id: id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        gender: true
                    }
                }
            }
        });
    }
    async delete(id, userId) {
        try {
            return await this.prismaService.post.delete({
                where: {
                    id: id,
                    userId: userId
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code == 'P2025')
                    return null;
            throw new BadRequestException(error)
        }
    }
    async update(id, data: Prisma.PostUpdateInput, userId) {
        try {
            const updatedPost = await this.prismaService.post.update({
                where: {
                    id: id,
                    userId: userId
                },
                data: data
            });
            return updatedPost;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError)
                if (error.code == 'P2016')
                    return null;
            throw new BadRequestException(error)
        }
        

    }
}
