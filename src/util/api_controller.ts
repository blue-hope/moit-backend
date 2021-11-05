import { Controller } from '@nestjs/common';

export function APIController(prefix: string) {
  return Controller(`api/v1/${prefix}`);
}
