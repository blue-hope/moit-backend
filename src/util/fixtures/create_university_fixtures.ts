import { University } from '@app/university/university.entity';

export async function createUniversity(): Promise<University> {
  return await University.create({ name: '연세대학교' }).save();
}
