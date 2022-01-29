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

  async getPosts() {
    const posts = await this.postsRepository.find({ relations: ['user'] });

    return {
      ok: true,
      posts,
    };
  }

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

  async votePost(postId: string, type: 'positive' | 'negative') {
    const post = await this.postsRepository.findOne(postId);
    if (type === 'positive') {
      post.positiveCount++;
    } else {
      post.negativeCount++;
    }

    await this.postsRepository.save(post);

    return {
      ok: true,
      post,
    };
  }
}
