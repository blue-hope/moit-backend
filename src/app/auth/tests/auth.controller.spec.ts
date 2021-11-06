import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  HttpModule,
  HttpService,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';
import { TestConnectionModule } from '@config/test/test.config';
import { JwtConstant } from '@constant/jwt';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { SocialProvider } from '@app/oauth/oauth.enum';
import { of } from 'rxjs';
import { MockAxiosResponse } from '@util/mock_axios_response';

describe('AuthController', () => {
  let app: INestApplication;
  let userService: UserService;
  let httpService: HttpService;

  let email: string;
  let password: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        HttpModule,
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: JwtConstant.secret,
          signOptions: { expiresIn: '60s' },
        }),
        ...(await TestConnectionModule('all')),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy],
    }).compile();
    userService = moduleFixture.get<UserService>(UserService);
    httpService = moduleFixture.get<HttpService>(HttpService);

    password = 'password';
    email = 'any@email.com';
    await userService.create({
      email: email,
      name: 'name',
      password: password,
      phoneNumber: '010-1234-5678',
      provider: SocialProvider.LOCAL,
    });
    await userService.readByEmail(email)!;

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new BadRequestInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.init();
  });

  describe('/api/v1/auth/login/', () => {
    it('login - Success', async () => {
      const data = {
        email: email,
        password: password,
      };
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login/')
        .send(data)
        .expect(HttpStatus.OK);
    });

    it('login - Fail', async () => {
      const data = {
        email: 'no@email.com',
        password: password,
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
            email: email,
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
