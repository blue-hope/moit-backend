import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Auth } from '@app/auth/auth.entity';
import { User } from '@app/user/user.entity';
import { IdOmitType } from '@util/id_omit_type';
import { IsString, Matches } from 'class-validator';

export class CreateUserDto extends IntersectionType(
  IdOmitType(User, ['auth', 'createdAt', 'updatedAt'] as const),
  IdOmitType(Auth, ['user', 'salt'] as const), // not partial, password needed on any case
) {
  @IsString()
  @Matches(
    /^(?=.*[a-zA-z]{1,})(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,}).{8,20}$/,
  )
  password: string;
}

export class UpdateUserDto extends IntersectionType(
  PartialType(CreateUserDto),
  IdOmitType(Auth, ['user', 'salt'] as const), // not partial, password needed on any case
) {
  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-zA-z]{1,})(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,}).{8,20}$/,
  )
  password: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-zA-z]{1,})(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,}).{8,20}$/,
  )
  originalPassword: string;
}
