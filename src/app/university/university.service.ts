import { Injectable } from '@nestjs/common';
import { University } from './university.entity';

@Injectable()
export class UniversityService {
  constructor() {}

  async readAll(): Promise<University[]> {
    return await University.find();
  }
}
