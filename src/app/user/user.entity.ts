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
import { University } from '@app/university/university.entity';
import { BaseEntityImpl } from '@util/base_entity_impl';

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
