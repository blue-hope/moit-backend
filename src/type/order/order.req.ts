import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OrderCreateRequestMenu {
  @ApiProperty()
  @IsNumber()
  menuId: number;

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class OrderCreateRequest {
  @ApiProperty()
  @IsNumber()
  restaurantId: number;

  @ApiProperty({ type: () => [OrderCreateRequestMenu] })
  menus: OrderCreateRequestMenu[];

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNumber()
  maxParticipants: number;
}

export class OrderJoinRequest {
  @ApiProperty()
  @IsNumber()
  orderId: number;
}
