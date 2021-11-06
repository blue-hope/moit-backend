import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { UserModule } from '@app/user/user.module';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { JwtConstant } from '@constant/jwt';
import { TestConnectionModule } from '@config/test/test.config';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { Category } from '../category.entity';

describe('CategoryService', () => {
  let app: TestingModule;
  let service: CategoryService;
  let userService: UserService;

  let user: User;
  let password: string;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [UserModule, ...(await TestConnectionModule('all'))],
      providers: [CategoryService],
    }).compile();
    service = app.get<CategoryService>(CategoryService);
    userService = app.get<UserService>(UserService);

    password = 'password';
    const email = 'any@email.com';
    await userService.create({
      email: email,
      name: 'name',
      password: password,
      phoneNumber: '010-1234-5678',
    });
    user = await userService.readByEmail(email)!;
  });

  it('readAll - Success', async () => {
    const category1 = await Category.create({
      name: '치킨',
    }).save();
    const category2 = await Category.create({
      name: '햄버거',
    }).save();
    const result = await service.readAll();
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(category1);
    expect(result[1]).toEqual(category2);
  });
});
