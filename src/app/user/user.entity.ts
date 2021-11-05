import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsDate, IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { Auth } from '@app/auth/auth.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CastedColumn } from '@config/test/test.sqlite';
import { Region } from '@app/region/region.entity';
import { Order } from '@app/order/order.entity';
import { Participant } from '@app/participant/participant.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Auth })
  @OneToOne(() => Auth, (auth) => auth.user, {
    cascade: true,
  })
  auth: Auth;

  @ApiProperty({ type: () => Region })
  @ManyToOne(() => Region, (region) => region.restaurants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  region: Region;

  @ApiProperty({ type: () => [Order] })
  @OneToMany(() => Order, (order) => order.restaurant, {
    cascade: true,
  })
  orders: Order[];

  @ApiProperty({ type: () => [Participant] })
  @OneToMany(() => Participant, (participant) => participant.user, {
    cascade: true,
  })
  participants: Participant[];

  @ApiProperty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsPhoneNumber()
  @Column({ unique: true })
  phoneNumber: string;

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

export class UserWithoutAuth extends OmitType(User, ['auth'] as const) {}
