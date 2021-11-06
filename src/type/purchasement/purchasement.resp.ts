import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class PurchasementReadAllResponse {
  @ApiProperty({ type: () => [PurchasementReadResponse] })
  purchasements: PurchasementReadResponse[];
}

export class PurchasementReadResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  orderId: string;

  @ApiProperty()
  @IsNumber()
  diff: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
