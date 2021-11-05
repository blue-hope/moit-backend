import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpService, HttpStatus, INestApplication } from '@nestjs/common';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';
import { TestConnectionModule } from '@config/test/test.config';
import { JwtConstant } from '@constant/jwt';

describe('AuthController', () => {
  let app: INestApplication;
  let userService: UserService;
  let httpService: HttpService;

  let email: string;
  let password: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
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
    });
    await userService.readByEmail(email);

    app = moduleFixture.createNestApplication();
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
});
