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
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Auth } from '@app/auth/auth.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CastedColumn } from '@config/test/test.sqlite';
import { Region } from '@app/region/region.entity';
import { Order } from '@app/order/order.entity';
import { Participant } from '@app/participant/participant.entity';
import { University } from '@app/university/university.entity';
import { BaseEntityImpl } from '@util/base_entity_impl';
import { Purchasement } from '@app/purchasement/purchasement.entity';
import { Manner } from '@app/manner/manner.entity';

@Entity()
export class User extends BaseEntityImpl {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Auth })
  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Promise<Auth>;

  @ApiProperty({ type: () => Region })
  @ManyToOne(() => Region, (region) => region.users)
  region: Promise<Region>;

  @ApiProperty({ type: () => University })
  @ManyToOne(() => University, (university) => university.users)
  university: Promise<University>;

  @ApiProperty({ type: () => [Order] })
  @OneToMany(() => Order, (order) => order.creator)
  orders: Promise<Order[]>;

  @ApiProperty({ type: () => [Participant] })
  @OneToMany(() => Participant, (participant) => participant.user)
  participants: Promise<Participant[]>;

  @ApiProperty({ type: () => [Purchasement] })
  @OneToMany(() => Purchasement, (purchasement) => purchasement.user)
  purchasements: Promise<Purchasement[]>;

  @ApiProperty({ type: () => [Manner] })
  @OneToMany(() => Manner, (manner) => manner.user)
  manners: Promise<Manner[]>;

  @ApiProperty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsString()
  @Column({ unique: true })
  phoneNumber: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  point: number = 0;

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
