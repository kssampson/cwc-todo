import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService){}
  // async validateUser(username:string, password:string) {
  //   const user = await this.userService.findOneWithUserName(username)
  // }
}
