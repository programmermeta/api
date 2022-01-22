import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Profile } from 'src/profiles/profiles.entity';
import { Post } from 'src/posts/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
