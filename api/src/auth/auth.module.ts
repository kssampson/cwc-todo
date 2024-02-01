import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
require('dotenv');

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: `${process.env.JWT_SECRET}`,
    signOptions: {expiresIn: "1h"}
  })],
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
