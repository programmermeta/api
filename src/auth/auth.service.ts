import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException({
        ok: false,
        error: {
          message: 'User not found',
        },
      });
    }

    const isValid = await compare(password, user.password);

    if (!isValid) return null;

    return user;
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: user.id };
    return {
      ok: true,
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
