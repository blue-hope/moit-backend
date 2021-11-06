import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor() {}

  async readAll(): Promise<Category[]> {
    return await Category.find();
  }
}
