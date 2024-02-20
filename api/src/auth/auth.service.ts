import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountDetailsDto } from 'src/user/dto/accountDetailsDto';

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
      username: user.username,
      email: user.email,
    }
  }

  async editAccountDetail(accountDetailsDto: AccountDetailsDto) {
    if (accountDetailsDto.fieldDesc === 'password') {
      accountDetailsDto.newValue = await bcrypt.hash(accountDetailsDto.newValue, 10);
    }
    return this.userService.updateAccount(accountDetailsDto);
  }
}
