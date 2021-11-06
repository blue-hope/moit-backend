import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { createUser } from '@util/fixtures/create_user_fixture';
import { AppModule } from '@app/app.module';
import { createCategory } from '@util/fixtures/create_category_fixture';

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
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new BadRequestInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.init();
    await createUser(moduleFixture);
    await createCategory();
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
