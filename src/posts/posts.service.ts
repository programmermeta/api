import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  async createPost(
    title: string,
    message: string,
    userId: string,
    codeSnippet?: string,
  ) {
    const user = await this.usersService.findUserById(userId);

    const post = this.postsRepository.create({
      title,
      message,
      codeSnippet,
      user,
    });

    await this.postsRepository.save(post);

    return {
      ok: true,
      post,
    };
  }
}
