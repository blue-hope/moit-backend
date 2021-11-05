import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';
import { AuthModule } from '@app/auth/auth.module';
import { TestConnectionModule } from '@config/test/test.config';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretOrKey, options, callback) => {
    callback(null, {
      email: 'any@email.com',
      sub: 1,
    });
  }),
}));

describe('UserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule, ...(await TestConnectionModule('all'))],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/api/v1/user', () => {
    it('create - Success', async () => {
      const data = {
        email: 'any@email.com',
        password: 'password',
        name: 'name',
      };
      return await request(app.getHttpServer())
        .post('/api/v1/user/')
        .send(data)
        .expect(HttpStatus.CREATED);
    });

    it('create - Fail (duplicated)', async () => {
      const data = {
        email: 'any@email.com',
        password: 'password',
        name: 'name',
      };
      return await request(app.getHttpServer())
        .post('/api/v1/user/')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('checkIdDuplicate', async () => {
      return await request(app.getHttpServer())
        .get('/api/v1/user/check?email=any%40email.com')
        .expect(HttpStatus.OK);
    });

    it('read - Success', async () => {
      return await request(app.getHttpServer())
        .get('/api/v1/user')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK);
    });

    it('update - Success', async () => {
      const data = {
        email: 'other@email.com', // btw, email cannot be changed
        password: 'newPassword',
        originalPassword: 'password',
        name: 'newName',
      };
      return await request(app.getHttpServer())
        .patch('/api/v1/user/')
        .set('Authorization', 'bearer token')
        .send(data)
        .expect(HttpStatus.OK);
    });

    it('update - Fail (wrong original password)', async () => {
      const data = {
        email: 'other@email.com',
        password: 'newPassword',
        originalPassword: 'password',
        name: 'newName',
      };
      return await request(app.getHttpServer())
        .patch('/api/v1/user/')
        .set('Authorization', 'bearer token')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('destroy - Success', async () => {
      return await request(app.getHttpServer())
        .delete('/api/v1/user')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK);
    });
  });
});
