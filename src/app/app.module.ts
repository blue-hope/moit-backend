import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { DefaultAdminModule } from 'nestjs-admin';

@Module({
  imports: [
    // TunnelOrmModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    DefaultAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
