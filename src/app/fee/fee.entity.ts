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
  restaurant: Restaurant;

  @ApiProperty()
  @IsNumber()
  @Column()
  priceStart: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  priceEnd: number;

  @ApiProperty()
  @IsNumber()
  @Column()
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
