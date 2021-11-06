import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReadResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNumber()
  restaurantId: number;

  @ApiProperty()
  @IsNumber()
  priceStart: number;

  @ApiProperty()
  @IsNumber()
  priceEnd: number;

  @ApiProperty()
  @IsNumber()
  deliveryFee: number;
}
