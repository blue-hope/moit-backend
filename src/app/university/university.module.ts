import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { UniversityController } from './university.controller';
import { University } from './university.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([University]),
  ],
  exports: [],
  controllers: [UniversityController],
  providers: [],
})
export class UniversityModule {}
