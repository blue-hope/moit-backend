import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { SocialProvider } from '@app/oauth/oauth.enum';
import { University } from '@app/university/university.entity';
import { createUniversity } from '@util/fixtures/create_university_fixtures';
import { AppModule } from '@app/app.module';

describe('UserService', () => {
  let app: TestingModule;
  let service: UserService;
  let authService: AuthService;

  let email: string;
  let university: University;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    service = app.get<UserService>(UserService);
    authService = app.get<AuthService>(AuthService);
    email = 'any@email.com';
    university = await createUniversity();
  });

  it('create - Success', async () => {
    const result = await service.create({
      email: email,
      name: 'name',
      password: 'password',
      phoneNumber: '010-1234-5678',
      universityId: university.id,
      provider: SocialProvider.LOCAL,
    });
    expect(result).toBeInstanceOf(User);
    expect(result).toMatchObject({
      id: 1,
      email: email,
      name: 'name',
    });
  });

  it('create - Fail (duplicated)', async () => {
    try {
      await service.create({
        email: email,
        name: 'name',
        password: 'password',
        phoneNumber: '010-1234-5678',
        universityId: university.id,
        provider: SocialProvider.LOCAL,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(QueryFailedError);
    }
  });

  it('readByEmail - Success', async () => {
    const result = await service.readByEmail(email);
    expect(result).toBeInstanceOf(User);
  });

  it('readByEmail - Fail', async () => {
    const result = await service.readByEmail('other@email.com');
    expect(result).toBeUndefined();
  });

  it('update - Success', async () => {
    const user = await service.readByEmail(email)!;
    const updateRequest = {
      originalPassword: 'password',
      password: 'newPassword',
    };
    await service.update(user, updateRequest);
    const isNewPasswordValid = await authService.validate(
      email,
      updateRequest.password,
    );
    expect(isNewPasswordValid).toBe(true);
  });

  it('delete - Success', async () => {
    const user = await service.readByEmail(email)!;
    await service.delete(user);
    try {
      await service.readByEmail(email);
    } catch (e) {
      expect(e).toBeInstanceOf(EntityNotFoundError);
    }
  });

  it('delete - Fail', async () => {
    const result = await service.create({
      email: email,
      name: 'name',
      password: 'password',
      phoneNumber: '010-1234-5678',
      universityId: university.id,
      provider: SocialProvider.LOCAL,
    });
    expect(result).toBeInstanceOf(User);
    const user = await service.readByEmail(email)!;
    user.id = 0;
    try {
      await service.delete(user);
    } catch (e) {
      expect(e).toBeInstanceOf(EntityNotFoundError);
    }
  });
});
