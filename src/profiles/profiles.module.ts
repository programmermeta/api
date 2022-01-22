import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './profiles.entity';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfilesController],
  providers: [ProfilesService, UsersService],
})
export class ProfilesModule {}
