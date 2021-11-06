import { ApiProperty } from '@nestjs/swagger';
import { FeeReadResponse } from '@type/fee/fee.resp';
import { MenuReadResponse } from '@type/menu/menu.resp';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class RestaurantReadAllResponse {
  @ApiProperty({ type: () => [RestaurantReadResponse] })
  restaurants: RestaurantReadResponse[];
}

export class RestaurantReadResponse {
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
