import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService ){}

  async validateUser(name: string, password: string) {
    const user = await this.userService.findOneWithUserName(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.name,
      sub: {
        name: user.name
      },
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
