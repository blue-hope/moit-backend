import { ApiProperty } from '@nestjs/swagger';
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
  thumnailImageKey: string;

  @ApiProperty()
  @IsNumber()
  creatorId: number;

  @ApiProperty()
  @IsString()
  message?: string;

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

export class OrderJoinResponse {
  @ApiProperty({ type: () => OrderReadResponse })
  order: OrderReadResponse;

  @ApiProperty()
  @IsBoolean()
  success: boolean;
}
