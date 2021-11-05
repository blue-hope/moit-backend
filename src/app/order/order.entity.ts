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
import { IsDate, IsString } from 'class-validator';
import { CastedColumn } from '@config/test/test.sqlite';
import { Fee } from '@app/fee/fee.entity';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { User } from '@app/user/user.entity';
import { Participant } from '@app/participant/participant.entity';

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
  restaurant: Restaurant;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  writer: User;

  @ApiProperty({ type: () => [Participant] })
  @OneToMany(() => Participant, (participant) => participant.user, {
    cascade: true,
  })
  participants: Participant[];

  @ApiProperty({ type: () => Fee })
  @ManyToOne(() => Fee)
  fee: Fee;

  @ApiProperty()
  @IsString()
  @Column()
  title: string;

  @ApiProperty()
  @IsString()
  @Column()
  content: string;

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
