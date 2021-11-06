import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/user/user.entity';
import { createUser } from '@util/fixtures/create_user_fixture';
import { AppModule } from '@app/app.module';
import { OrderService } from '../order.service';
import { Order } from '../order.entity';
import { createRestaurant } from '@util/fixtures/create_restaurant_fixture';
import { Fee } from '@app/fee/fee.entity';
import { Menu } from '@app/menu/menu.entity';
import { Participant } from '@app/participant/participant.entity';
import { OrderMenu } from '@app/orderMenu/order_menu.entity';
import { serialize } from '@util/serialize';

describe('OrderService', () => {
  let app: TestingModule;
  let service: OrderService;

  let order1: Order;
  let order2: Order;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    service = app.get<OrderService>(OrderService);
    const user = await createUser(app);
    const restaurant = await createRestaurant();
    const fee = await Fee.create({
      priceStart: 10000,
      priceEnd: 15000,
      deliveryFee: 1000,
    }).save();
    const menu1 = await Menu.create({
      restaurant: Promise.resolve(restaurant),
      name: 'chicke',
      price: 14000,
      imageKey: '',
    }).save();
    const menu2 = await Menu.create({
      restaurant: Promise.resolve(restaurant),
      name: 'ham',
      price: 8000,
      imageKey: '',
    }).save();
    order1 = await Order.create({
      restaurant: Promise.resolve(restaurant),
      fee: Promise.resolve(fee),
      creator: Promise.resolve(user),
      message: '',
      maxParticipants: 5,
    }).save();
    await Participant.create({
      order: Promise.resolve(order1),
      user: Promise.resolve(user),
    }).save();
    await OrderMenu.create({
      menu: Promise.resolve(menu1),
      order: Promise.resolve(order1),
    }).save();
    await OrderMenu.create({
      menu: Promise.resolve(menu2),
      order: Promise.resolve(order1),
    }).save();
    order2 = await Order.create({
      restaurant: Promise.resolve(restaurant),
      fee: Promise.resolve(fee),
      creator: Promise.resolve(user),
      message: '',
      maxParticipants: 5,
    }).save();
    await Participant.create({
      order: Promise.resolve(order2),
      user: Promise.resolve(user),
    }).save();
    await OrderMenu.create({
      menu: Promise.resolve(menu1),
      order: Promise.resolve(order2),
    }).save();
    await OrderMenu.create({
      menu: Promise.resolve(menu2),
      order: Promise.resolve(order2),
    }).save();
  });

  it('readAllByQuery - Success', async () => {
    const result = await service.readAllByQuery(1, 'nal');
    console.log(result);
    console.log(result.map((r) => serialize(r)));
  });
});
