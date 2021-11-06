import { ApiProperty } from '@nestjs/swagger';
import { FeeReadResponse } from '@type/fee/fee.resp';
import { MenuReadResponse } from '@type/menu/menu.resp';
import { OrderReadResponse } from '@type/order/order.resp';
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

  @ApiProperty({ type: () => [MenuReadResponse] })
  menus: MenuReadResponse[];

  @ApiProperty({ type: () => [FeeReadResponse] })
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

export class RestaurantReadAllOrdersResponse {
  @ApiProperty({ type: () => [OrderReadResponse] })
  orders: OrderReadResponse[];

  @ApiProperty()
  @IsNumber()
  totalOrderCount: number;

  @ApiProperty()
  @IsNumber()
  readyOrderCount: number;

  @ApiProperty()
  @IsNumber()
  cookingOrderCount: number;

  @ApiProperty()
  @IsNumber()
  completedOrderCount: number;
}
