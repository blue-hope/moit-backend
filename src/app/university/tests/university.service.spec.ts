import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/user/user.module';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { TestConnectionModule } from '@config/test/test.config';
import { UniversityService } from '../university.service';
import { University } from '../university.entity';
import { createUser } from '@util/fixtures/create_user_fixture';
import { AppModule } from '@app/app.module';

describe('UniversityService', () => {
  let app: TestingModule;
  let service: UniversityService;
  let userService: UserService;

  let user: User;
  let password: string;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    service = app.get<UniversityService>(UniversityService);
    userService = app.get<UserService>(UserService);
    user = await createUser(app);
  });

  it('readAll - Success', async () => {
    const university1 = await University.create({
      name: '고려대학교',
    }).save();
    const university2 = await University.create({
      name: '서울대학교',
    }).save();
    const result = await service.readAll();
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(await user.university);
    expect(result[1]).toEqual(university1);
    expect(result[2]).toEqual(university2);
  });
});
