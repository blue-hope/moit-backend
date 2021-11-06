import { BaseEntity, ObjectType } from 'typeorm';

export class BaseEntityImpl extends BaseEntity {
  static create<T extends BaseEntity>(
    this: ObjectType<T>,
    entityOrEntities?: any,
  ): T {
    const promiseKeys = Object.keys(entityOrEntities).filter(
      (key) =>
        !!entityOrEntities[key] &&
        typeof entityOrEntities[key].then === 'function', // isPromise
    );
    const entity = (this as any).getRepository().create(entityOrEntities);
    promiseKeys.forEach((key) => {
      return (entity[key] = entityOrEntities[key]);
    });
    return entity;
  }
}
