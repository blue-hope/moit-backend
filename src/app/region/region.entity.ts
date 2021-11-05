import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { User } from '@app/user/user.entity';
import { University } from '@app/university/university.entity';

@Entity()
export class Region {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [Restaurant] })
  @OneToMany(() => Restaurant, (restaurant) => restaurant.region, {
    cascade: true,
  })
  restaurants: Restaurant[];

  @ApiProperty({ type: () => [User] })
  @OneToMany(() => User, (user) => user.region, {
    cascade: true,
  })
  users: User[];

  @ApiProperty({ type: () => [University] })
  @OneToMany(() => University, (university) => university.region, {
    cascade: true,
  })
  universities: University[];

  @ApiProperty()
  @IsNumber()
  @Column()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  longitude: number;
}
