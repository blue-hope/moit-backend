import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { TestConnectionModule } from '@config/test/test.config';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { UniversityController } from '../university.controller';
import { UniversityService } from '../university.service';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretOrKey, options, callback) => {
    callback(null, {
      email: 'any@email.com',
      sub: 1,
    });
  }),
}));

describe('UniversityController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule, ...(await TestConnectionModule('all'))],
      controllers: [UniversityController],
      providers: [UniversityService],
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

  describe('/api/v1/university', () => {
    it('readAll - Success', async () => {
      return await request(app.getHttpServer())
        .get('/api/v1/university')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK);
    });
  });
});
