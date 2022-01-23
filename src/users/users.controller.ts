import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser(username, password);
  }

  @Get('check/:username')
  checkUsernameAvailability(@Param('username') username: string) {
    return this.usersService.checkUsernameAvailability(username);
  }
}
