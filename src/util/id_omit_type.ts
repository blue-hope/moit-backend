import { Type } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';

export function IdOmitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): Type<Omit<T, typeof keys[number] | 'id'>> {
  return OmitType(classRef, [...keys, 'id' as K]) as any;
}
