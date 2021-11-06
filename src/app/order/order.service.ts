import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { asyncFilter } from '@util/async_filter';

@Injectable()
export class OrderService {
  constructor() {}

  async readAllByQuery(
    categoryId: number | undefined,
    searchKey: string,
  ): Promise<Order[]> {
    const orders = await Order.find({
      relations: [
        'restaurant',
        'restaurant.category',
        'creator',
        'participants',
        'orderMenus',
        'fee',
        'orderMenus.menu', // TODO: too many relations
      ],
      order: {
        createdAt: 'DESC',
      },
    });
    const filter = async (order) => {
      return (
        (await order.restaurant).name.includes(searchKey) &&
        (categoryId === undefined ||
          (await (await order.restaurant).category).id === categoryId)
      );
    };
    return asyncFilter(orders, filter); // TODO: use sql (not support lazy find?)
  }
}
