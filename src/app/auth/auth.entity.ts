import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { User } from '@app/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class Auth extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.auth, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty()
  @IsString()
  @Column()
  password: string;

  @ApiProperty()
  @IsString()
  @Column()
  salt: string;
}
