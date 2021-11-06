import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { TestConnectionModule } from '@config/test/test.config';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { UserService } from '@app/user/user.service';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretOrKey, options, callback) => {
    callback(null, {
      email: 'any@email.com',
      sub: 1,
    });
  }),
}));

describe('CategoryController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule, ...(await TestConnectionModule('all'))],
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new BadRequestInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());

    const data = {
      email: 'any@email.com',
      password: 'password',
      name: 'name',
      phoneNumber: '010-1234-5678',
    };
    await app.init();
    await request(app.getHttpServer()).post('/api/v1/user').send(data);
  });

  describe('/api/v1/category', () => {
    it('readAll - Success', async () => {
      return await request(app.getHttpServer())
        .get('/api/v1/category')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK);
    });
  });
});
