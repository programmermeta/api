import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostsService, UsersService],
  controllers: [PostsController],
})
export class PostsModule {}
