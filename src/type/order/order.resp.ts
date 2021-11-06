import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ReadAllResponse {
  @ApiProperty()
  orders: ReadResponse[];
}

export class ReadResponse {
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
