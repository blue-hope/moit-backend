import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { CategoryService } from '../category.service';
import { Category } from '../category.entity';
import { createUser } from '@util/fixtures/create_user_fixture';
import { AppModule } from '@app/app.module';
import { createCategory } from '@util/fixtures/create_category_fixture';

describe('CategoryService', () => {
  let app: TestingModule;
  let service: CategoryService;
  let userService: UserService;

  let user: User;
  let category: Category;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    service = app.get<CategoryService>(CategoryService);
    userService = app.get<UserService>(UserService);
    user = await createUser(app);
    category = await createCategory();
  });

  it('readAll - Success', async () => {
    const category1 = await Category.create({
      name: '치킨',
    }).save();
    const category2 = await Category.create({
      name: '햄버거',
    }).save();
    const result = await service.readAll();
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(category);
    expect(result[1]).toEqual(category1);
    expect(result[2]).toEqual(category2);
  });
});
