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
import { Menu } from '@app/menu/menu.entity';

@Entity()
export class University {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Region })
  @ManyToOne(() => Region, (region) => region.restaurants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  region: Region;

  @ApiProperty({ type: () => [Menu] })
  @OneToMany(() => Menu, (menu) => menu.restaurant, {
    cascade: true,
  })
  menus: Menu[];

  @ApiProperty()
  @IsString()
  @Column()
  name: string;
}
