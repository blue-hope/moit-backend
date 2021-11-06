import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Region } from '@app/region/region.entity';
import { Zone } from '@app/zone/zone.entity';
import { User } from '@app/user/user.entity';

@Entity()
export class University {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Region })
  @ManyToOne(() => Region, (region) => region.universities, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  region: Promise<Region>;

  @ApiProperty({ type: () => [User] })
  @OneToMany(() => User, (user) => user.university)
  users: Promise<User[]>;

  @ApiProperty({ type: () => [Zone] })
  @OneToMany(() => Zone, (zone) => zone.university)
  zones: Promise<Zone[]>;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;
}
