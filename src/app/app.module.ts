import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { CategoryModule } from './category/category.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { UniversityModule } from './university/university.module';
import { PurchasementModule } from './purchasement/purchasement.module';

@Module({
  imports: [
    // TunnelOrmModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    CategoryModule,
    RestaurantModule,
    OrderModule,
    UniversityModule,
    PurchasementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
