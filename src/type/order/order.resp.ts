import { ApiProperty } from '@nestjs/swagger';
import { MenuReadResponse } from '@type/menu/menu.resp';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class OrderCreateResponse {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class OrderReadAllResponse {
  @ApiProperty({ type: () => [OrderReadResponse] })
  orders: OrderReadResponse[];
}

export class OrderReadResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  restaurantId: number;

  @ApiProperty()
  @IsString()
  restaurantName: string;

  @ApiProperty()
  @IsString()
  thumbnailImageKey: string;

  @ApiProperty()
  @IsNumber()
  creatorId: number;

  @ApiProperty({ type: () => [MenuReadResponse] })
  menus: MenuReadResponse[];

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNumber()
  maxParticipants: number;

  @ApiProperty()
  @IsNumber()
  nowParticipants: number;

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

export class OrderReadForRestaurantResponse extends OrderReadResponse {
  @ApiProperty()
  @IsString()
  creatorPhoneNumber?: string;

  @ApiProperty()
  participantsName: string[];

  @ApiProperty()
  @IsString()
  deliveryLocation: string;
}

export class OrderJoinResponse {
  @ApiProperty({ type: () => OrderReadResponse })
  order: OrderReadResponse;

  @ApiProperty()
  @IsBoolean()
  success: boolean;
}
