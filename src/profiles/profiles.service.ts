import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Profile } from './profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    private readonly usersService: UsersService,
  ) {}

  async createProfile(email: string, user: User): Promise<Profile> {
    const profile = this.profilesRepository.create({
      email,
    });

    await this.profilesRepository.save(profile);
    await this.usersService.addProfile(user, profile);

    return profile;
  }
}
