import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Order])],
  exports: [],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule {}
