import { User } from '@app/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityImpl } from '@util/base_entity_impl';
import { IsNumber } from 'class-validator';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manner extends BaseEntityImpl {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.purchasements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Promise<User>;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsNumber()
  judgeId: number;
}
