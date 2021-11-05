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

  it('findOneByEmail - Success', async () => {
    const result = await service.findOneByEmail(email);
    expect(result).toBeInstanceOf(User);
  });

  it('findOneByEmail - Fail', async () => {
    const result = await service.findOneByEmail('other@email.com');
    expect(result).toBe(undefined);
  });

  it('isNewUser - Success(non-duplicated)', async () => {
    const newEmail = 'new@email.com';
    const result = await service.isNewUser(newEmail);
    expect(result).toBe(true);
  });

  it('isNewUser - Fail(duplicated)', async () => {
    const result = await service.isNewUser(email);
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
    const UpdateUserDto = {
      originalPassword: 'password',
      password: 'newPassword',
      name: 'newName',
    };
    const updateResult = await service.update(user, UpdateUserDto);
    expect(updateResult.name).toBe(UpdateUserDto.name);
    const updatedUser = await authService.validateUser(
      email,
      UpdateUserDto.password,
    );
    expect(updatedUser).toBeInstanceOf(User);
  });

  it('delete - Fail', async () => {
    const user = await service.findOneByEmail(email);
    user.id = 0;
    try {
      await service.delete(user);
    } catch (e) {
      expect(e).toBeInstanceOf(MustBeEntityError);
    }
  });

  it('delete - Success', async () => {
    const user = await service.findOneByEmail(email);
    const result = await service.delete(user);
    expect(result).toBeInstanceOf(User);
    const deletedUser = await service.findOneByEmail(email);
    expect(deletedUser).toBe(undefined);
  });
});
