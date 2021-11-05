import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { IsDate, IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { Auth } from '@app/auth/auth.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CastedColumn } from '@config/test/test.sqlite';
import { Region } from '@app/region/region.entity';
import { Order } from '@app/order/order.entity';
import { Participant } from '@app/participant/participant.entity';
import { University } from '@app/university/university.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Auth })
  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @ApiProperty({ type: () => Region })
  @ManyToOne(() => Region, (region) => region.users)
  region: Region;

  @ApiProperty({ type: () => University })
  @ManyToOne(() => University, (university) => university.users)
  university: University;

  @ApiProperty({ type: () => [Order] })
  @OneToMany(() => Order, (order) => order.creator)
  orders: Order[];

  @ApiProperty({ type: () => [Participant] })
  @OneToMany(() => Participant, (participant) => participant.user)
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
