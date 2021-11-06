import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from '@app/user/user.entity';
import { University } from '@app/university/university.entity';

@Entity()
export class Region {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [User] })
  @OneToMany(() => User, (user) => user.region)
  users: Promise<User[]>;

  @ApiProperty({ type: () => [University] })
  @OneToMany(() => University, (university) => university.region)
  universities: Promise<University[]>;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  longitude: number;
}
