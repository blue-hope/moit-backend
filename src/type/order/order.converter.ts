import { Order } from '@app/order/order.entity';
import {
  OrderReadForRestaurantResponse,
  OrderReadResponse,
} from './order.resp';

export async function orderConverter(order: Order): Promise<OrderReadResponse> {
  // order's relations are eager loaded
  // also menu are eager loaded via orderMenus
  const restaurant = await order.restaurant;
  const creator = await order.creator;
  const participants = await order.participants;
  const orderMenus = await order.orderMenus;
  const fee = await order.fee;
  return {
    id: order.id,
    message: order.message,
    maxParticipants: order.maxParticipants,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    thumbnailImageKey: restaurant.imageKey,
    creatorId: creator.id,
    nowParticipants: participants.length,
    totalPrice:
      (
        await Promise.all(
          orderMenus.map(
            async (orderMenu) => orderMenu.count * (await orderMenu.menu).price,
          ),
        )
      ).reduce((prev, cur) => prev + cur, 0) + fee.deliveryFee,
    menus: await Promise.all(
      orderMenus.map(async (orderMenu) => {
        const menu = await orderMenu.menu;
        return {
          name: menu.name,
          id: menu.id,
          price: menu.price,
          imageKey: menu.imageKey,
        };
      }),
    ),
  };
}

export async function orderConverterForRestaurant(
  order: Order,
): Promise<OrderReadForRestaurantResponse> {
  // order's relations are eager loaded
  // also menu are eager loaded via orderMenus
  const restaurant = await order.restaurant;
  const creator = await order.creator;
  const participants = await order.participants;
  const orderMenus = await order.orderMenus;
  const fee = await order.fee;
  return {
    id: order.id,
    message: order.message,
    maxParticipants: order.maxParticipants,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    thumbnailImageKey: restaurant.imageKey,
    creatorId: creator.id,
    creatorPhoneNumber: creator.phoneNumber,
    nowParticipants: participants.length,
    deliveryLocation: (await creator.university).name,
    participantsName: await Promise.all(
      participants.map(async (participant) => (await participant.user).name),
    ),
    totalPrice:
      (
        await Promise.all(
          orderMenus.map(
            async (orderMenu) => orderMenu.count * (await orderMenu.menu).price,
          ),
        )
      ).reduce((prev, cur) => prev + cur, 0) + fee.deliveryFee,
    menus: await Promise.all(
      orderMenus.map(async (orderMenu) => {
        const menu = await orderMenu.menu;
        return {
          name: menu.name,
          id: menu.id,
          price: menu.price,
          imageKey: menu.imageKey,
        };
      }),
    ),
  };
}
