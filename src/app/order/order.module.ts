import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Order])],
  exports: [],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
