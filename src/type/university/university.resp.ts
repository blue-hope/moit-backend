import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UniversityReadAllResponse {
  @ApiProperty({ type: () => [UniversityReadResponse] })
  universities: UniversityReadResponse[];
}

export class UniversityReadResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}
