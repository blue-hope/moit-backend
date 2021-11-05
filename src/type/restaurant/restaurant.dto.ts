import { Category } from '@app/category/category.entity';
import { Fee } from '@app/fee/fee.entity';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { IntersectionType } from '@nestjs/swagger';
import { IdOmitType } from '@util/id_omit_type';

export class CreateRestaurantDto extends IdOmitType(Restaurant, [
  'createdAt',
  'updatedAt',
] as const) {
  categoryId: number;
}
