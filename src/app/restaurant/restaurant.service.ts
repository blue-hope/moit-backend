import { Injectable } from '@nestjs/common';
import { asyncFilter } from '@util/async_filter';
import { Restaurant } from '@app/restaurant/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor() {}

  async readAllByQuery(searchKey: string): Promise<Restaurant[]> {
    const restaurants = await Restaurant.find({
      relations: ['menus', 'fees', 'category'],
      order: {
        createdAt: 'DESC',
      },
    });
    const filter = async (restaurant) => {
      return restaurant.name.includes(searchKey);
    };
    return asyncFilter(restaurants, filter); // TODO: use sql (not support lazy find?)
  }

  async read(id: number): Promise<Restaurant> {
    return await Restaurant.findOne(id);
  }
}
