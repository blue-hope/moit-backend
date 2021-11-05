import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateRequest {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-zA-z]{1,})(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,}).{8,20}$/,
  )
  password: string;
}

export class UpdateRequest {
  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-zA-z]{1,})(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,}).{8,20}$/,
  )
  password?: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-zA-z]{1,})(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,}).{8,20}$/,
  )
  originalPassword: string;
}
