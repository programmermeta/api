import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api/');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  const port = process.env.PORT || 8000;
  await app.listen(port);
};
bootstrap();
