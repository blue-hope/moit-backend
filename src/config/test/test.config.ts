import { Auth } from '@app/auth/auth.entity';
import { Category } from '@app/category/category.entity';
import { Fee } from '@app/fee/fee.entity';
import { Manner } from '@app/manner/manner.entity';
import { Menu } from '@app/menu/menu.entity';
import { Order } from '@app/order/order.entity';
import { OrderMenu } from '@app/orderMenu/order_menu.entity';
import { Participant } from '@app/participant/participant.entity';
import { Purchasement } from '@app/purchasement/purchasement.entity';
import { Region } from '@app/region/region.entity';
import { Restaurant } from '@app/restaurant/restaurant.entity';
import { University } from '@app/university/university.entity';
import { User } from '@app/user/user.entity';
import { Zone } from '@app/zone/zone.entity';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

type Entity = EntityClassOrSchema;

export const createTestConfiguration = (
  entities: Entity[],
): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: ':memory:',
  entities,
  dropSchema: true,
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
});

function getDefaultEntities() {
  return [
    User,
    Auth,
    Region,
    University,
    Zone,
    Restaurant,
    Category,
    Menu,
    Fee,
    Order,
    Participant,
    Purchasement,
    OrderMenu,
    Manner,
  ];
}

export const TestConnectionModule: (
  entities: Entity[] | 'all',
) => Promise<DynamicModule[]> = async (entities) => {
  if (entities === 'all') {
    entities = getDefaultEntities();
  }
  const ConnectionModule: DynamicModule = TypeOrmModule.forRoot(
    createTestConfiguration(entities),
  );
  const FeatureModules: DynamicModule = TypeOrmModule.forFeature(entities);
  return [ConnectionModule, FeatureModules];
};
