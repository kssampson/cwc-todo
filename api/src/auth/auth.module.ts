import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
// import { JwtStrategy } from './strategies/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
require('dotenv').config()

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {expiresIn: "90s"},
    }),
    UserModule,
    PassportModule,
    MailModule
],
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}

//removed JwtStrategy from providers --> JwtStrategy