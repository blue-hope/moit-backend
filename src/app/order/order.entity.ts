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
import { CastedColumn } from '@config/test/test.sqlite';
import { Fee } from '@app/fee/fee.entity';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { User } from '@app/user/user.entity';
import { Participant } from '@app/participant/participant.entity';
import { OrderMenu } from '@app/orderMenu/order_menu.entity';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Restaurant })
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Promise<Restaurant>;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  creator: Promise<User>;

  @ApiProperty({ type: () => [Participant] })
  @OneToMany(() => Participant, (participant) => participant.user)
  participants: Promise<Participant[]>;

  @ApiProperty({ type: () => [OrderMenu] })
  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order)
  orderMenus: Promise<OrderMenu[]>;

  @ApiProperty({ type: () => Fee })
  @ManyToOne(() => Fee)
  fee: Promise<Fee>;

  @ApiProperty()
  @IsString()
  @Column()
  message: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  maxParticipants: number;

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
