import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@app/app.module';
import { CacheSingleton } from '@config/cache/cache';
import { json } from 'express';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { SecretsManagerSingleton } from '@config/secrets_manager/secrets_manager';

async function prepareSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Moit Api Docs')
    .setDescription('Api Docs')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

async function prepareAWSSecretManager() {
  await SecretsManagerSingleton.prepare(['prod/server/key']);
}

async function prepareCache() {
  await CacheSingleton.prepareMemcache();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await prepareSwagger(app);
  await prepareAWSSecretManager();
  await prepareCache();
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new BadRequestInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.use(json({ limit: '40mb' }));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}

bootstrap();
