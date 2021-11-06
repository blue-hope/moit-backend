import { ApiProperty } from '@nestjs/swagger';
import { ReadResponse as FeeReadResponse } from '@type/fee/fee.resp';
import { ReadResponse as MenuReadResponse } from '@type/menu/menu.resp';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ReadResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  menus: MenuReadResponse[];

  @ApiProperty()
  fees: FeeReadResponse[];

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  openAt: Date;

  @ApiProperty()
  @IsDate()
  closeAt: Date;
}

export class ReadAllResponse {
  @ApiProperty({ type: [ReadResponse] })
  restaurants: ReadResponse[];
}
