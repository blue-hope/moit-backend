import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Category } from '@app/category/category.entity';
import { CastedColumn } from '@config/test/test.sqlite';
import { Region } from '@app/region/region.entity';
import { Menu } from '@app/menu/menu.entity';
import { Fee } from '@app/fee/fee.entity';
import { Order } from '@app/order/order.entity';

@Entity()
export class Restaurant {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.restaurants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @ApiProperty()
  @ManyToOne(() => Region, (region) => region.restaurants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  region: Region;

  @ApiProperty()
  @OneToMany(() => Menu, (menu) => menu.restaurant, {
    cascade: true,
  })
  menus: Menu[];

  @ApiProperty()
  @OneToMany(() => Fee, (fee) => fee.restaurant, {
    cascade: true,
  })
  fees: Fee[];

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.restaurant, {
    cascade: true,
  })
  orders: Order[];

  @ApiProperty()
  @IsString()
  @Column()
  account: string;

  @ApiProperty()
  @IsDate()
  @CastedColumn({
    type: 'timestamp',
    name: 'open_at',
  })
  openAt: Date;

  @ApiProperty()
  @IsDate()
  @CastedColumn({
    type: 'timestamp',
    name: 'close_at',
  })
  closeAt: Date;

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
