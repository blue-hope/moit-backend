import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpService, HttpStatus, INestApplication } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { of } from 'rxjs';
import { MockAxiosResponse } from '@util/mock_axios_response';
import { createUser } from '@util/fixtures/create_user_fixture';
import { User } from '@app/user/user.entity';
import { AppModule } from '@app/app.module';

describe('AuthController', () => {
  let app: INestApplication;
  let httpService: HttpService;

  let user: User;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    httpService = moduleFixture.get<HttpService>(HttpService);
    user = await createUser(moduleFixture);
    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new BadRequestInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.init();
  });

  describe('/api/v1/auth/login/', () => {
    it('login - Success', async () => {
      const data = {
        email: user.email,
        password: 'password',
      };
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login/')
        .send(data)
        .expect(HttpStatus.OK);
    });

    it('login - Fail', async () => {
      const data = {
        email: 'no@email.com',
        password: 'password',
      };
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login/')
        .send(data)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('/api/v1/auth/login/social/google/', () => {
    it('social login - Success', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce(() =>
        of(
          MockAxiosResponse({
            access_token: 'mock_access_token',
            expire_in: 1000,
            refresh_token: 'mock_refresh_token',
            scope: 'mock_scope',
            token_type: 'jwt',
            id_token: 'mock_id_token',
          }),
        ),
      );
      jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
        of(
          MockAxiosResponse({
            email: user.email,
            name: 'name',
          }),
        ),
      );
      const data = {
        code: 'code',
        redirectUri: 'http://re.direct.uri/re.direct.uri/',
      };
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login/social/google/')
        .send(data)
        .expect(HttpStatus.OK);
    });

    it('social login - Success (created)', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce(() =>
        of(
          MockAxiosResponse({
            access_token: 'mock_access_token',
            expire_in: 1000,
            refresh_token: 'mock_refresh_token',
            scope: 'mock_scope',
            token_type: 'jwt',
            id_token: 'mock_id_token',
          }),
        ),
      );
      jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
        of(
          MockAxiosResponse({
            email: 'other@email.com',
            name: 'name',
          }),
        ),
      );
      const data = {
        code: 'code',
        redirectUri: 'http://re.direct.uri/re.direct.uri/',
      };
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login/social/google/')
        .send(data)
        .expect(HttpStatus.OK);
    });

    it('social login - Fail', async () => {
      const data = {
        code: 'code',
        redirectUri: 'http://re.direct.uri/re.direct.uri/',
      };
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login/social/google/')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
