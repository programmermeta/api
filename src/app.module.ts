import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://uxljcqkc:sQTu9LRb9FkQS97iTz4EhXHAuY289Mx4@satao.db.elephantsql.com/uxljcqkc',
      autoLoadEntities: true,
      // synchronize: true,
      logging: true,
    }),
    UsersModule,
    ProfilesModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
