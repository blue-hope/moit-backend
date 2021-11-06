import { Category } from '@app/category/category.entity';

export async function createCategory(): Promise<Category> {
  return await Category.create({ name: '피자' }).save();
}
