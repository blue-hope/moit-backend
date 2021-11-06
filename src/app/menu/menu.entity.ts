import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { OrderMenu } from '@app/orderMenu/order_menu.entity';

@Entity()
export class Menu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Restaurant })
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Promise<Restaurant>;

  @ApiProperty({ type: () => [OrderMenu] })
  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order)
  orderMenus: Promise<OrderMenu[]>;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  price: number;

  @ApiProperty()
  @IsString()
  @Column()
  imageKey: string;
}
