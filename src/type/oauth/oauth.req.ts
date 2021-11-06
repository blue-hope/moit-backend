import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OAuthLoginRequest {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  redirectUri: string;
}
