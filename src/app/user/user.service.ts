import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from '@app/user/user.entity';
import { AuthService } from '@app/auth/auth.service';
import { CreateRequest, UpdateRequest } from '@type/user/user.req';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(CreateRequest: CreateRequest): Promise<User> {
    const { password, ...userDto } = CreateRequest;
    const user = await User.create(userDto).save();
    await this.authService.create(user, password);
    return user;
  }

  async update(user: User, updateRequest: UpdateRequest): Promise<User> {
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
