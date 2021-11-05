import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserWithoutAuth } from '@app/user/user.entity';
import { AuthService } from '@app/auth/auth.service';
import { CreateUserDto, UpdateUserDto } from '@type/user/user.dto';
import { CreateOrUpdateAuthDto } from '@type/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      relations: ['auth'],
      where: (qb) => {
        qb.where({
          email: email,
        });
      },
    });
  }

  async isNewUser(email: string): Promise<boolean> {
    return (await this.findOneByEmail(email)) === undefined;
  }

  async create(CreateUserDto: CreateUserDto): Promise<UserWithoutAuth> {
    const { password, ...userDto } = CreateUserDto;
    let user = await this.userRepository.create(userDto);
    user = await this.userRepository.save(user);
    const createAuthDto: CreateOrUpdateAuthDto = {
      password,
      user: user,
    };
    await this.authService.create(createAuthDto);
    return user;
  }

  async validateUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user !== undefined) {
      return user;
    } else {
      throw new BadRequestException();
    }
  }

  async update(
    user: User,
    UpdateUserDto: UpdateUserDto,
  ): Promise<UserWithoutAuth> {
    const { password, originalPassword, ...userDto } = UpdateUserDto;
    if (await this.authService.validateUser(user.email, originalPassword)) {
      // update auth
      await this.authService.update({
        user,
        password,
      });
      // update user
      delete user.auth;
      delete userDto.email; // cannot update email
      await this.userRepository.update(user.id, userDto);
    } else {
      throw new BadRequestException();
    }
    return await this.userRepository.findOne(user.id);
  }

  async read(user: User): Promise<UserWithoutAuth> {
    return await this.userRepository.findOne(user.id);
  }

  async delete(user: User) {
    await this.userRepository.delete(user.id);
  }
}
