import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/user/user.module';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { TestConnectionModule } from '@config/test/test.config';
import { UniversityService } from '../university.service';
import { University } from '../university.entity';
import { SocialProvider } from '@app/oauth/oauth.enum';

describe('UniversityService', () => {
  let app: TestingModule;
  let service: UniversityService;
  let userService: UserService;

  let user: User;
  let password: string;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [UserModule, ...(await TestConnectionModule('all'))],
      providers: [UniversityService],
    }).compile();
    service = app.get<UniversityService>(UniversityService);
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
    const university1 = await University.create({
      name: '서울대학교',
    }).save();
    const university2 = await University.create({
      name: '연세대학교',
    }).save();
    const result = await service.readAll();
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(university1);
    expect(result[1]).toEqual(university2);
  });
});
