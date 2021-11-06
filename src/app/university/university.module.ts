import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { UniversityController } from './university.controller';
import { University } from './university.entity';
import { UniversityService } from './university.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([University]),
  ],
  exports: [UniversityService],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
