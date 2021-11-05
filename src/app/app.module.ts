import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { DefaultAdminModule } from 'nestjs-admin';
import { CategoryModule } from './category/category.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    // TunnelOrmModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    CategoryModule,
    RestaurantModule,
    // DefaultAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
