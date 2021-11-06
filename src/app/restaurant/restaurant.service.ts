import { Injectable } from '@nestjs/common';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { Like } from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor() {}

  async readAllByQuery(searchKey: string): Promise<Restaurant[]> {
    return await Restaurant.find({
      relations: ['menus', 'fees', 'category'],
      where: {
        name: Like(`%${searchKey}%`),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async read(id: number): Promise<Restaurant> {
    return await Restaurant.findOne(id);
  }
}
