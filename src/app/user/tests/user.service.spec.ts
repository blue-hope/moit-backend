import { Test, TestingModule } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
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
      });
    } catch (e) {
      expect(e).toBeInstanceOf(QueryFailedError);
    }
  });

  it('findOneByEmail - Success', async () => {
    const result = await service.findOneByEmail(email);
    expect(result).toBeInstanceOf(User);
  });

  it('findOneByEmail - Fail', async () => {
    const result = await service.findOneByEmail('other@email.com');
    expect(result).toBe(undefined);
  });

  it('checkIdDuplicate - Success(duplicated)', async () => {
    const result = await service.checkIdDuplicate(email);
    expect(result).toBe(true);
  });

  it('checkIdDuplicate - Fail(non-duplicated)', async () => {
    const newEmail = 'new@email.com';
    const result = await service.checkIdDuplicate(newEmail);
    expect(result).toBe(false);
  });

  it('read - Success', async () => {
    const user = await service.findOneByEmail(email);
    const result = await service.read(user);
    expect(result).toBeInstanceOf(User);
    expect(result).toMatchObject({
      id: 1,
      email: email,
      name: 'name',
    });
  });

  it('read - Fail', async () => {
    const user = await service.findOneByEmail(email);
    user.id = 0;
    const result = await service.read(user);
    expect(result).toBe(undefined);
  });

  it('update - Success', async () => {
    const user = await service.findOneByEmail(email);
    const updateUserDto = {
      originalPassword: 'password',
      password: 'newPassword',
      name: 'newName',
    };
    const updateResult = await service.update(user, updateUserDto);
    expect(updateResult.name).toBe(updateUserDto.name);
    const updatedUser = await authService.validateUser(
      email,
      updateUserDto.password,
    );
    expect(updatedUser).toBeInstanceOf(User);
  });

  it('destroy - Fail', async () => {
    const user = await service.findOneByEmail(email);
    user.id = 0;
    try {
      await service.destroy(user);
    } catch (e) {
      expect(e).toBeInstanceOf(MustBeEntityError);
    }
  });

  it('destroy - Success', async () => {
    const user = await service.findOneByEmail(email);
    const result = await service.destroy(user);
    expect(result).toBeInstanceOf(User);
    const deletedUser = await service.findOneByEmail(email);
    expect(deletedUser).toBe(undefined);
  });
});
