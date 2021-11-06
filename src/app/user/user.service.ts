import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from '@app/user/user.entity';
import { AuthService } from '@app/auth/auth.service';
import { UserCreateRequest, UserUpdateRequest } from '@type/user/user.req';
import { UniversityService } from '@app/university/university.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly universityService: UniversityService,
  ) {}

  async create(CreateRequest: UserCreateRequest): Promise<User> {
    const { password, ...userDto } = CreateRequest;
    const university = await this.universityService.readById(
      userDto.universityId,
    );
    const region = await university.region;
    const user = await User.create({
      ...userDto,
      university: Promise.resolve(university),
      region: Promise.resolve(region),
    }).save();
    await this.authService.create(user, password);
    return user;
  }

  async update(user: User, updateRequest: UserUpdateRequest): Promise<User> {
    const { password, originalPassword } = updateRequest;
    if (await this.authService.validate(user.email, originalPassword)) {
      await this.authService.update(user, password);
    } else {
      throw new BadRequestException();
    }
    await user.reload();
    return user;
  }

  async delete(user: User) {
    await user.remove();
  }

  async readByEmail(email: string): Promise<User | undefined> {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
