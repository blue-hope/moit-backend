import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/user/user.entity';
import { Order } from '@app/order/order.entity';
import { IsDate } from 'class-validator';
import { CastedColumn } from '@config/test/test.sqlite';
import { BaseEntityImpl } from '@util/base_entity_impl';

@Entity()
export class Participant extends BaseEntityImpl {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, (order) => order.participants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Promise<Order>;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.participants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Promise<User>;

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
