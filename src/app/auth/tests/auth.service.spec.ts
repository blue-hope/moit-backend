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
import { SocialProvider } from '@app/oauth/oauth.enum';

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
      provider: SocialProvider.LOCAL,
    });
    user = await userService.readByEmail(email)!;
  });

  it('comparePassword - Success', async () => {
    const result = await service.comparePassword(user, 'password');
    expect(result).toBe(true);
  });

  it('comparePassword - Fail', async () => {
    const result = await service.comparePassword(user, 'wrong_password');
    expect(result).toBe(false);
  });

  it('validate - Success', async () => {
    const result = await service.validate(user.email, password);
    expect(result).toBe(true);
  });

  it('validate - Fail', async () => {
    const result = await service.validate('no@email.com', 'wrong_password');
    expect(result).toBe(false);
  });

  it('login - Success', () => {
    const result = service.login(user);
    expect(result.split('.')).toHaveLength(3); // jwt rule
  });

  it('create - Success', async () => {
    // pass - test on user service
  });
});
