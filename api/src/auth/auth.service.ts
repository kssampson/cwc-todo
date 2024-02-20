import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(name: string, password: string) {
    const user = await this.userService.findOneWithUserName(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(user: User) {
  //   const payload = {
  //     email: user.email,
  //     sub: {
  //       name: user.name
  //     },
  //   };
  //   return {
  //     ...user,
  //     accessToken: this.jwtService.sign(payload),
  //   };
  // }

  async creatAccessToken(user) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name
      }
    };
    return {
      ...user,
      accessToken: await this.jwtService.signAsync(payload)
    }
  }

  async login(user: User) {
    return this.creatAccessToken(user)
  }

  async getProfileData(email: string) {
    const user = await this.userService.findOneWithEmail(email);
    return {
      id: user.id,
      user: user.name,
      email: user.email,
    }
  }

  async editProfileData(accountId: number, userDetail: string, fieldDesc: string) {
    return await this.userService.updateAccount(accountId, userDetail, fieldDesc)
  }
}
