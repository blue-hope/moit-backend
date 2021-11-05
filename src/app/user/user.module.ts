import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { AuthModule } from '@app/auth/auth.module';
import { UserAdmin } from './user.admin';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    DefaultAdminModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('User', UserAdmin);
  }
}
