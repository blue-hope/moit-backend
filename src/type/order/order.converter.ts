import { Order } from '@app/order/order.entity';
import { OrderReadResponse } from './order.resp';

export async function orderConverter(order: Order): Promise<OrderReadResponse> {
  // order's relations are eager loaded
  // also menu are eager loaded via orderMenus
  const restaurant = await order.restaurant;
  const creator = await order.creator;
  const participants = await order.participants;
  const orderMenus = await order.orderMenus;
  const fee = await order.fee;
  console.log(orderMenus[0].count, (await orderMenus[0].menu).price);
  return {
    ...order,
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
  };
}
