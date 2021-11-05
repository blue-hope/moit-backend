import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { Auth } from '@app/auth/auth.entity';
import { UserModule } from '@app/user/user.module';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { JwtConstant } from '@constant/jwt';
import { TestConnectionModule } from '@config/test/test.config';

describe('AuthService', () => {
  let app: TestingModule;
  let service: AuthService;
  let userService: UserService;

  let user: User;
  let password: string;

  beforeAll(async () => {
    app = await Test.createTestingModule({
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
    service = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);

    password = 'password';
    const email = 'any@email.com';
    await userService.create({
      email: email,
      name: 'name',
      password: password,
      phoneNumber: '010-1234-5678',
    });
    user = await userService.readByEmail(email);
  });

  it('bcryptCompareUser - Success', async () => {
    const result = await service.comparePassword(user, 'password');
    expect(result).toBe(true);
  });

  it('bcryptCompareUser - Fail', async () => {
    const result = await service.comparePassword(user, 'wrong_password');
    expect(result).toBe(false);
  });

  it('validate - Success', async () => {
    const result = await service.validate(user.email, password);
    expect(result).toBeInstanceOf(User);
  });

  it('validate - Fail', async () => {
    const result = await service.validate('no@email.com', password);
    expect(result).toBeNull();
  });

  it('login - Success', async () => {
    const result = await service.login(user);
    expect(Object.keys(result).toString()).toBe('access_token');
  });

  it('create - Success', async () => {
    // pass - test on user service
  });

  it('create - Success (constraint failure avoidance)', async () => {
    const result = await service.create(user, password);
    expect(result).toBeInstanceOf(Auth);
  });
});
