import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { AppModule } from '@app/app.module';
import { SecretsManagerSingleton } from '@config/secrets_manager/secrets_manager';
import { CacheSingleton } from '@config/cache/cache';
import { SentryInterceptor } from '@interceptor/sentry.interceptor';
import { json } from 'express';

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
  if (process.env.NODE_ENV === 'production') {
    await SecretsManagerSingleton.prepare(['prod/server/key']);
  }
}

async function prepareSentry(app: INestApplication) {
  if (process.env.NODE_ENV === 'production') {
    await Sentry.init({
      dsn: SecretsManagerSingleton.getValue('SENTRY_DSN'),
    });
    app.useGlobalInterceptors(new SentryInterceptor());
  }
}

async function prepareCache() {
  if (process.env.NODE_ENV === 'production') {
    await CacheSingleton.prepareRedis();
  } else {
    await CacheSingleton.prepareMemcache();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await prepareSwagger(app);
  await prepareAWSSecretManager();
  await prepareSentry(app);
  await prepareCache();
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(json({ limit: '40mb' }));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}

bootstrap();
