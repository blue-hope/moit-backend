import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/user/user.entity';
import { createUser } from '@util/fixtures/create_user_fixture';
import { AppModule } from '@app/app.module';

describe('AuthService', () => {
  let app: TestingModule;
  let service: AuthService;
  let user: User;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    service = app.get<AuthService>(AuthService);
    user = await createUser(app);
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
    const result = await service.validate(user.email, 'password');
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
