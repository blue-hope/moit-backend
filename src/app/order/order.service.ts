import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { asyncFilter } from '@util/async_filter';
import { OrderCreateRequest } from '@type/order/order.req';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { Menu } from '@app/menu/menu.entity';
import { In } from 'typeorm';
import { Participant } from '@app/participant/participant.entity';
import { User } from '@app/user/user.entity';
import { OrderMenu } from '@app/orderMenu/order_menu.entity';

@Injectable()
export class OrderService {
  constructor() {}

  async create(
    user: User,
    orderCreateRequest: OrderCreateRequest,
  ): Promise<Order> {
    const { restaurantId, menus: reqMenus, ...orderDto } = orderCreateRequest;
    const restaurant = await Restaurant.findOne(restaurantId);
    const menus = await Menu.find({
      where: {
        id: In(reqMenus.map((menu) => menu.menuId)),
      },
    });

    const fees = await restaurant.fees;
    const order = await Order.create({
      restaurant: Promise.resolve(restaurant),
      creator: Promise.resolve(user),
      fee: Promise.resolve(fees[0]),
      ...orderDto,
    }).save();
    await Participant.create({
      order: Promise.resolve(order),
      user: Promise.resolve(user),
    }).save();
    await Promise.all(
      menus.map(async (menu) => {
        await OrderMenu.create({
          order: Promise.resolve(order),
          menu: Promise.resolve(menu),
        }).save();
      }),
    );
    await order.reload();
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
        (isNaN(categoryId) ||
          (await (await order.restaurant).category).id === categoryId)
      );
    };
    return asyncFilter(orders, filter); // TODO: use sql (not support lazy find?)
  }

  async join(user: User, orderId: number): Promise<Order> {
    const order = await Order.findOne(orderId);
    await Participant.create({
      user: Promise.resolve(user),
      order: Promise.resolve(order),
    }).save();
    console.log('!!', await order.participants);
    return order;
  }
}
