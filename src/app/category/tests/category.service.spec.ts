import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/user/user.module';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { TestConnectionModule } from '@config/test/test.config';
import { CategoryService } from '../category.service';
import { Category } from '../category.entity';
import { SocialProvider } from '@app/oauth/oauth.enum';

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
      provider: SocialProvider.LOCAL,
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
