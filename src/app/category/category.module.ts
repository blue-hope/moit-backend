import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Category])],
  exports: [],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
