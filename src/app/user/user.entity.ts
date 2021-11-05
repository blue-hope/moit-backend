import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { Auth } from '@app/auth/auth.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CastedColumn } from '@config/test/test.sqlite';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

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
  @OneToOne(() => Auth, (auth) => auth.user, {
    cascade: true,
  })
  auth: Auth;

  @ApiProperty()
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
