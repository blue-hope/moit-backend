import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { User } from '@app/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseEntityImpl } from '@util/base_entity_impl';

@Entity()
export class Auth extends BaseEntityImpl {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.auth, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  user: Promise<User>;

  @ApiProperty()
  @IsString()
  @Column()
  password: string;

  @ApiProperty()
  @IsString()
  @Column()
  salt: string;
}
