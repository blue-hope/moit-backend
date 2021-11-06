import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Restaurant } from '@app/restaurant/restaurant.entity';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [Restaurant] })
  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  restaurants: Promise<Restaurant[]>;

  @ApiProperty()
  @IsString()
  @Column()
  title: string;
}
