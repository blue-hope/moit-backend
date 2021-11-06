import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/user/user.entity';
import { UserModule } from '@app/user/user.module';
import { Auth } from '@app/auth/auth.entity';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { JwtConstant } from '@constant/jwt';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: JwtConstant.secret,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Category]),
  ],
  exports: [],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
