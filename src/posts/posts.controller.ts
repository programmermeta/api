import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
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
}
