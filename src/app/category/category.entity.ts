import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { BaseEntityImpl } from '@util/base_entity_impl';

@Entity()
export class Category extends BaseEntityImpl {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [Restaurant] })
  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  restaurants: Promise<Restaurant[]>;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;
}
