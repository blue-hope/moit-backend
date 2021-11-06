import { Restaurant } from '@app/restaurant/restaurant.entity';
import { createCategory } from './create_category_fixture';

export async function createRestaurant(): Promise<Restaurant> {
  const category = await createCategory();
  return await Restaurant.create({
    category: Promise.resolve(category),
    name: 'McDonald',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
}
