import { Controller } from '@nestjs/common';

export function ApiController(prefix: string) {
  return Controller(`api/v1/${prefix}`);
}
