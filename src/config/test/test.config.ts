import { Auth } from '@app/auth/auth.entity';
import { User } from '@app/user/user.entity';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import AdminUser from 'nestjs-admin/dist/src/adminUser/adminUser.entity';

type Entity = EntityClassOrSchema;

export const createTestConfiguration = (
  entities: Entity[],
): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: ':memory:',
  entities,
  dropSchema: true,
  synchronize: true,
  logging: false,
});

function getDefaultEntities() {
  return [User, Auth, AdminUser];
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
