import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(@Request() req, @Body('email') email: string) {
    const existingUser = await this.usersService.findUserById(req.user.id);

    if (existingUser.profile) {
      throw new ConflictException({
        ok: false,
        message: 'Profile already exists for the user',
      });
    }

    const profile = await this.profilesService.createProfile(
      email,
      existingUser,
    );

    return {
      ok: true,
      profile,
    };
  }
}
