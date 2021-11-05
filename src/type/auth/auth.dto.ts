import { Auth } from '@app/auth/auth.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IdOmitType } from '@util/id_omit_type';
import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';

export class JwtDataDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  sub: number;

  @ApiProperty()
  @IsNumber()
  iat: number;

  @ApiProperty()
  @IsNumber()
  exp: number;
}
export class jwtPayloadDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  sub: number;
}

export class CreateOrUpdateAuthDto extends IdOmitType(Auth, ['salt']) {
  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-zA-z]{1,})(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,}).{8,20}$/,
  )
  password: string;
}
