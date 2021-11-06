import { Order } from '@app/order/order.entity';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { RestaurantReadResponse } from './restaurant.resp';

export async function restaurantConverter(
  restaurant: Restaurant,
): Promise<RestaurantReadResponse> {
  // restaurant's relations are eager loaded
  const category = await restaurant.category;
  const menus = await restaurant.menus;
  const fees = await restaurant.fees;
  return {
    ...restaurant,
    categoryId: category.id,
    categoryName: category.name,
    menus: menus.map((menu) => {
      return {
        id: menu.id,
        name: menu.name,
        price: menu.price,
        imageKey: menu.imageKey,
      };
    }),
    fees: fees.map((fee) => {
      return {
        id: fee.id,
        priceStart: fee.priceStart,
        priceEnd: fee.priceEnd,
        deliveryFee: fee.deliveryFee,
      };
    }),
    name: restaurant.name,
    openAt: restaurant.openAt,
    closeAt: restaurant.closeAt,
  };
}
