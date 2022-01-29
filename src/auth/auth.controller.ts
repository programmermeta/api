import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    console.log({ local: req.user });
    return this.getUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    console.log({ jwt: req.user });
    return this.getUser(req.user);
  }

  private async getUser(user) {
    const payload = await this.authService.login(user);
    return {
      ok: true,
      ...payload,
    };
  }
}
