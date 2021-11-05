import { Auth } from '@app/auth/auth.entity';
import { Board } from '@app/board/board.entity';
import { Group } from '@app/group/group.entity';
import { Plan } from '@app/plan/plan.entity';
import { UserGroup } from '@app/usergroup/usergroup.entity';
import { User } from '@app/user/user.entity';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import AdminUser from 'nestjs-admin/dist/src/adminUser/adminUser.entity';
import { Memo } from '@app/memo/memo.entity';

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
  return [User, Group, UserGroup, Auth, AdminUser, Board, Plan, Memo];
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
