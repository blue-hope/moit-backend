import { SocialProvider } from '@app/oauth/oauth.enum';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { TestingModule } from '@nestjs/testing';
import { createUniversity } from './create_university_fixture';

export async function createUser(app: TestingModule): Promise<User> {
  const university = await createUniversity();
  const userService = app.get<UserService>(UserService);
  return await userService.create({
    email: 'any@email.com',
    name: 'name',
    phoneNumber: '010-1234-5678',
    password: 'password',
    universityId: university.id,
    provider: SocialProvider.LOCAL,
  });
}
