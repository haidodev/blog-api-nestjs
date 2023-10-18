import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity, Prisma} from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { PostDTO } from './dto/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}
    @Get()
    async findAll() {
        return await this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id:number) : Promise<PostEntity> {
        const post = await this.postService.findOne(id);
        if (!post) {
            throw new NotFoundException('This post doesn\'t exist.');
        }
        return post;
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDTO, @Request() req):Promise<PostEntity> {
        return await this.postService.create({
            ...post, 
            user: { connect: {id: req.user.id}}
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id : number, @Body() post: PostDTO, @Request() req) : Promise<PostEntity> {
        const updatedPost = await this.postService.update(id, post, req.user.id);
        if (!updatedPost) {
            throw new NotFoundException('This post doesn\'t exist.');
        }
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id:number, @Request() req) {
        const deleted = await this.postService.delete(id, req.user.id);
        if (!deleted) {
            throw new NotFoundException('This post doesn\'t exist.');
        }
        return 'Successfully deleted'
    }
}
