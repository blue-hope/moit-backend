import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';

import { AppModule } from '@app/app.module';
import { Category } from '@app/category/category.entity';
import { University } from '@app/university/university.entity';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { Menu } from '@app/menu/menu.entity';
import { Fee } from '@app/fee/fee.entity';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretOrKey, options, callback) => {
    callback(
      null,
      token === 'token'
        ? {
            email: 'any@email.com',
            sub: 1,
          }
        : token === 'token2'
        ? {
            email: 'other@email.com',
            sub: 2,
          }
        : {
            email: 'other2@email.com',
            sub: 3,
          },
    );
  }),
}));

const prepare = async () => {
  console.log('FILLING....');
  const pizza = await Category.create({ name: '피자' }).save();
  const chicken = await Category.create({ name: '치킨' }).save();
  const hamburger = await Category.create({ name: '햄버거' }).save();
  await Category.create({ name: '디저트' }).save();
  const coffee = await Category.create({ name: '커피' }).save();
  await Restaurant.create({
    category: Promise.resolve(hamburger),
    name: '바스버거 신촌점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  const pizzahut = await Restaurant.create({
    category: Promise.resolve(pizza),
    name: '피자헛 신촌점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  await Restaurant.create({
    category: Promise.resolve(chicken),
    name: '교촌치킨 연희점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  await Restaurant.create({
    category: Promise.resolve(pizza),
    name: '피자1호점 연대점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  await Restaurant.create({
    category: Promise.resolve(pizza),
    name: '킹오브피자 연대점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  const ediya = await Restaurant.create({
    category: Promise.resolve(coffee),
    name: '이디야커피 연희점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  await Restaurant.create({
    category: Promise.resolve(coffee),
    name: '커피프린스 연대점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  await Restaurant.create({
    category: Promise.resolve(coffee),
    name: '더치커피 연대점',
    account: '000000000',
    imageKey: '000000000',
    openAt: new Date(),
    closeAt: new Date(),
  }).save();
  await Menu.create({
    restaurant: Promise.resolve(pizzahut),
    name: '오리지날 피자',
    price: 15000,
    imageKey: '',
  }).save();
  await Menu.create({
    restaurant: Promise.resolve(pizzahut),
    name: '프리미엄 피자',
    price: 23000,
    imageKey: '',
  }).save();
  await Menu.create({
    restaurant: Promise.resolve(pizzahut),
    name: '스파이시 피자',
    price: 16000,
    imageKey: '',
  }).save();
  await Menu.create({
    restaurant: Promise.resolve(ediya),
    name: '아이스 아메리카노',
    price: 3000,
    imageKey: '',
  }).save();
  await Menu.create({
    restaurant: Promise.resolve(ediya),
    name: '카페 라떼',
    price: 4000,
    imageKey: '',
  }).save();
  await Menu.create({
    restaurant: Promise.resolve(ediya),
    name: '카라멜 마끼야또',
    price: 5000,
    imageKey: '',
  }).save();
  await University.create({ name: '연세대학교' }).save();
  await University.create({ name: '고려대학교' }).save();
  await University.create({ name: '서울대학교' }).save();
  await Fee.create({
    restaurant: Promise.resolve(ediya),
    priceStart: 0,
    priceEnd: 30000,
    deliveryFee: 1000,
  }).save();
  await Fee.create({
    restaurant: Promise.resolve(pizzahut),
    priceStart: 0,
    priceEnd: 30000,
    deliveryFee: 2000,
  }).save();
  console.log('END FILLING....');
};

describe('WholeSenarioTest', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new BadRequestInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.init();
    await prepare();
  });

  describe('main senario', () => {
    it('senario', async () => {
      console.log('회원가입 시 대학 리스트');
      await request(app.getHttpServer())
        .get('/api/v1/university')
        .expect(HttpStatus.OK);

      console.log('회원가입');
      const data1 = {
        email: 'any@email.com',
        password: 'password',
        name: 'name',
        phoneNumber: '010-1234-5678',
        universityId: 1,
      };
      await request(app.getHttpServer())
        .post('/api/v1/user')
        .send(data1)
        .expect(HttpStatus.CREATED, {
          email: 'any@email.com',
          id: 1,
        });

      console.log('메인 화면, 주문 정보들 리스팅 (empty)');
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=latest&searchKey=')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK, {
          orders: [],
        });
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=remaining&searchKey=')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK, {
          orders: [],
        });
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=latest&searchKey=&categoryId=1')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK, {
          orders: [],
        });

      console.log('주문 생성 위해 레스토랑 검색');
      await request(app.getHttpServer())
        .get('/api/v1/restaurant?searchKey=')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK, {
          restaurants: [],
        });
      await request(app.getHttpServer())
        .get(`/api/v1/restaurant?searchKey=${encodeURI('피자')}`)
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK);

      console.log('주문 생성');
      const data2 = {
        restaurantId: 2,
        menus: [
          { menuId: 1, count: 1 },
          { menuId: 2, count: 1 },
          { menuId: 3, count: 1 },
        ],
        message: '조심히 오세요',
        maxParticipants: 6,
      };
      await request(app.getHttpServer())
        .post('/api/v1/order')
        .set('Authorization', 'bearer token')
        .send(data2)
        .expect(HttpStatus.CREATED);

      console.log('메인에서 뜨는 화면은?');
      console.log('메인 화면, 주문 정보들 리스팅 (1건)');
      console.log(
        (
          await request(app.getHttpServer())
            .get('/api/v1/order?sortBy=latest&searchKey=')
            .set('Authorization', 'bearer token')
            .expect(HttpStatus.OK)
        ).text,
      );
      console.log(
        (
          await request(app.getHttpServer())
            .get('/api/v1/order?sortBy=remaining&searchKey=')
            .set('Authorization', 'bearer token')
            .expect(HttpStatus.OK)
        ).text,
      );

      console.log(
        (
          await request(app.getHttpServer())
            .get('/api/v1/order?sortBy=latest&searchKey=&categoryId=1')
            .set('Authorization', 'bearer token')
            .expect(HttpStatus.OK)
        ).text,
      );

      // 디저트도 먹어야지
      // 주문 생성
      const data3 = {
        restaurantId: 6,
        menus: [
          { menuId: 4, count: 1 },
          { menuId: 5, count: 1 },
          { menuId: 6, count: 1 },
        ],
        message: '안전하게 오세요',
        maxParticipants: 3,
      };
      await request(app.getHttpServer())
        .post('/api/v1/order')
        .set('Authorization', 'bearer token')
        .send(data3)
        .expect(HttpStatus.CREATED);

      // 메인에서 뜨는 화면은?
      // 메인 화면, 주문 정보들 리스팅 (2건)
      console.log(
        (
          await request(app.getHttpServer())
            .get('/api/v1/order?sortBy=latest&searchKey=')
            .set('Authorization', 'bearer token')
            .expect(HttpStatus.OK)
        ).text,
      );
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=remaining&searchKey=')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK);
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=latest&searchKey=&categoryId=1')
        .set('Authorization', 'bearer token')
        .expect(HttpStatus.OK);

      // 또다른 누군가
      const data4 = {
        email: 'other@email.com',
        password: 'password',
        name: 'name',
        phoneNumber: '010-1234-5679',
        universityId: 1,
      };
      await request(app.getHttpServer())
        .post('/api/v1/user')
        .send(data4)
        .expect(HttpStatus.CREATED);

      // 또다른 누군가
      const data5 = {
        email: 'other2@email.com',
        password: 'password',
        name: 'name',
        phoneNumber: '010-1234-5670',
        universityId: 1,
      };
      await request(app.getHttpServer())
        .post('/api/v1/user')
        .send(data5)
        .expect(HttpStatus.CREATED);

      // 메인에서 뜨는 화면은?
      // 메인 화면, 주문 정보들 리스팅 (2건)
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=latest&searchKey=')
        .set('Authorization', 'bearer token2')
        .expect(HttpStatus.OK);
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=remaining&searchKey=')
        .set('Authorization', 'bearer token2')
        .expect(HttpStatus.OK);
      await request(app.getHttpServer())
        .get('/api/v1/order?sortBy=latest&searchKey=&categoryId=1')
        .set('Authorization', 'bearer token2')
        .expect(HttpStatus.OK);

      console.log('하나를 클릭해 참여(커피) -> 모두 충족 안누른 상태');
      console.log(
        (
          await request(app.getHttpServer())
            .get('/api/v1/restaurant/6/orders')
            .expect(HttpStatus.OK)
        ).text,
      );
      console.log('하나를 클릭해 참여(커피) -> 모두 충족 1');
      console.log(
        (
          await request(app.getHttpServer())
            .post('/api/v1/order/2/join')
            .set('Authorization', 'bearer token2')
            .expect(HttpStatus.OK)
        ).text,
      );
      console.log('하나를 클릭해 참여(커피) -> 모두 충족 2');
      console.log(
        (
          await request(app.getHttpServer())
            .post('/api/v1/order/2/join')
            .set('Authorization', 'bearer token3')
            .expect(HttpStatus.OK)
        ).text,
      );
      console.log('하나를 클릭해 참여(커피) -> 모두 충족해서 사장님께');
      console.log(
        (
          await request(app.getHttpServer())
            .get('/api/v1/restaurant/6/orders')
            .expect(HttpStatus.OK)
        ).text,
      );
    });
  });
});
