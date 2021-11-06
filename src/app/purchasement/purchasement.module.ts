import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { Purchasement } from './purchasement.entity';
import { PurchasementController } from './purchasement.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Purchasement]),
  ],
  exports: [],
  controllers: [PurchasementController],
  providers: [],
})
export class PurchasementModule {}
