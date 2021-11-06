import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CategoryReadAllResponse {
  @ApiProperty({ type: () => CategoryReadResponse })
  categories: CategoryReadResponse[];
}

export class CategoryReadResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}
