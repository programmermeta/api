import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string) {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async createUser(username: string, password: string) {
    const existingUser = await this.findOne(username);

    if (existingUser) {
      throw new ConflictException({
        ok: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.save({
      username,
      password: hashedPassword,
    });

    return {
      ok: true,
      user,
    };
  }
}
