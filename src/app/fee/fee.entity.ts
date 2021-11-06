import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { CastedColumn } from '@config/test/test.sqlite';

@Entity()
export class Fee {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Restaurant })
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Promise<Restaurant>;

  @ApiProperty()
  @IsNumber()
  @Column({ name: 'price_start' })
  priceStart: number;

  @ApiProperty()
  @IsNumber()
  @Column({ name: 'price_end' })
  priceEnd: number;

  @ApiProperty()
  @IsNumber()
  @Column({ name: 'delivery_fee' })
  deliveryFee: number;

  @ApiProperty()
  @IsDate()
  @CastedColumn({
    type: 'timestamp',
    name: 'created_at',
    namespace: CreateDateColumn,
  })
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @CastedColumn({
    type: 'timestamp',
    name: 'updated_at',
    namespace: UpdateDateColumn,
  })
  updatedAt: Date;
}
