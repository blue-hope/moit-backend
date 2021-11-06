import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@app/order/order.entity';
import { IsDate, IsNumber } from 'class-validator';
import { CastedColumn } from '@config/test/test.sqlite';
import { Menu } from '@app/menu/menu.entity';

@Entity()
export class OrderMenu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, (order) => order.orderMenus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Promise<Order>;

  @ApiProperty({ type: () => Menu })
  @ManyToOne(() => Menu, (menu) => menu.orderMenus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  menu: Promise<Menu>;

  @ApiProperty()
  @IsNumber()
  count: number;

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
