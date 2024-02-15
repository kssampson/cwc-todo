import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

//removed JwtStrategy from providers --> JwtStrategy