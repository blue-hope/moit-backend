import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './restaurant.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),

    TypeOrmModule.forFeature([Restaurant]),
  ],
  exports: [],
  controllers: [RestaurantController],
  providers: [],
})
export class RestaurantModule {}
