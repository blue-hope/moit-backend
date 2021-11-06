import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { OrderService } from '@app/order/order.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Restaurant]),
  ],
  exports: [],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
