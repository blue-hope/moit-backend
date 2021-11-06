import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@app/order/order.entity';
import { IsDate, IsNumber } from 'class-validator';
import { CastedColumn } from '@config/test/test.sqlite';
import { User } from '@app/user/user.entity';

@Entity()
export class Purchasement {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Order })
  @OneToOne(() => Order, (order) => order.purchasement, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  order: Promise<Order>;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.purchasements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Promise<User>;

  @ApiProperty()
  @IsNumber()
  beforePoint: number;

  @ApiProperty()
  @IsNumber()
  afterPoint: number;

  @ApiProperty()
  @IsNumber()
  diff: number;

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
