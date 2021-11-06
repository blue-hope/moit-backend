import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { createUser } from '@util/fixtures/create_user_fixture';
import { AppModule } from '@app/app.module';
import { createRestaurant } from '@util/fixtures/create_restaurant_fixture';
import { Order } from '../order.entity';
import { Fee } from '@app/fee/fee.entity';
import { Participant } from '@app/participant/participant.entity';
import { Menu } from '@app/menu/menu.entity';
import { OrderMenu } from '@app/orderMenu/order_menu.entity';
import { orderConverter } from '@type/order/order.converter';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretOrKey, options, callback) => {
    callback(null, {
      email: 'any@email.com',
      sub: 1,
    });
  }),
}));

describe('OrderController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new BadRequestInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.init();
    const user = await createUser(moduleFixture);
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
    const order = await Order.create({
      restaurant: Promise.resolve(restaurant),
      fee: Promise.resolve(fee),
      creator: Promise.resolve(user),
      message: '',
      maxParticipants: 5,
    }).save();
    await Participant.create({
      order: Promise.resolve(order),
      user: Promise.resolve(user),
    }).save();
    await OrderMenu.create({
      menu: Promise.resolve(menu1),
      order: Promise.resolve(order),
    }).save();
    await OrderMenu.create({
      menu: Promise.resolve(menu2),
      order: Promise.resolve(order),
    }).save();
    const orders = await Order.find({
      relations: [
        'restaurant',
        'creator',
        'participants',
        'orderMenus',
        'fee',
        'orderMenus.menu',
      ],
    });
    console.log(
      await Promise.all(
        orders.map(async (order) => await orderConverter(order)),
      ),
    );
  });

  describe('/api/v1/category', () => {
    it('readAll - Success', async () => {
      expect(1).toBe(1);
    });
  });
});
