import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Post()
  createPost(
    @Request() req,
    @Body('title') title: string,
    @Body('message') message: string,
    @Body('code') codeSnippet?: string,
  ) {
    return this.postsService.createPost(
      title,
      message,
      req.user.id,
      codeSnippet,
    );
  }

  @Get('/vote/:id/:type')
  votePost(
    @Param('id') id: string,
    @Param('type') type: 'positive' | 'negative',
  ) {
    return this.postsService.votePost(id, type);
  }
}
