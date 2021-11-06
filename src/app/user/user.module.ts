import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { AuthModule } from '@app/auth/auth.module';
import { UniversityModule } from '@app/university/university.module';
import { UniversityService } from '@app/university/university.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UniversityModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
