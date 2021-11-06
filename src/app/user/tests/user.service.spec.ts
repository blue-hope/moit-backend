import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { MustBeEntityError } from 'typeorm/error/MustBeEntityError';
import { AuthModule } from '@app/auth/auth.module';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';
import { TestConnectionModule } from '@config/test/test.config';

describe('UserService', () => {
  let app: TestingModule;
  let service: UserService;
  let authService: AuthService;

  let email: string;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AuthModule, ...(await TestConnectionModule('all'))],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    service = app.get<UserService>(UserService);
    authService = app.get<AuthService>(AuthService);
    email = 'any@email.com';
  });

  it('create - Success', async () => {
    const result = await service.create({
      email: email,
      name: 'name',
      password: 'password',
      phoneNumber: '010-1234-5678',
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
