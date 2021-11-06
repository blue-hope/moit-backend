import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { asyncFilter } from '@util/async_filter';
import { OrderCreateRequest } from '@type/order/order.req';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { Menu } from '@app/menu/menu.entity';
import { In } from 'typeorm';
import { Participant } from '@app/participant/participant.entity';
import { User } from '@app/user/user.entity';

@Injectable()
export class OrderService {
  constructor() {}

  async create(
    user: User,
    orderCreateRequest: OrderCreateRequest,
  ): Promise<Order> {
    const { restaurantId, menus: reqMenus, ...orderDto } = orderCreateRequest;
    const restaurant = Restaurant.findOne(restaurantId);
    const menus = Menu.find({
      where: {
        id: In(reqMenus.map((menu) => menu.menuId)),
      },
    });
    const order = await Order.create({
      restaurant,
      menus,
      ...orderDto,
    }).save();
    await Participant.create({
      order: Promise.resolve(order),
      user: Promise.resolve(user),
    }).save();
    return order;
  }

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

  async join(user: User, orderId: number): Promise<Order> {
    await Participant.create({
      order: Order.findOne(orderId),
      user: Promise.resolve(user),
    }).save();
    return await Order.findOne(orderId);
  }
}
