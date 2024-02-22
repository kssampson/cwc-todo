import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountDetailsDto } from 'src/user/dto/accountDetailsDto';
import { ForgotPasswordEmailDto } from 'src/user/dto/createUserDto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
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

  async creatAccessToken(user, secret?: string) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name
      }
    };
    if (secret) {
      return await this.jwtService.signAsync(payload, {
        secret,
        expiresIn: "10m",
      })
    } else {
      return {
        ...user,
        accessToken: await this.jwtService.signAsync(payload)
      }
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

  async sendResetPasswordEmail(forgotPasswordEmailDto: ForgotPasswordEmailDto) {
    const user = await this.userService.findOneWithEmail(forgotPasswordEmailDto.email)
    if (!user) {
      throw new BadRequestException('Email not found!')
    } else {
      //create jwt w/ current hashed password
      const token = await this.creatAccessToken(user, user.password)
      //send email to user w/ link to reset password page w/ the jwt and user.id as params
      return await this.mailService.sendPasswordEmailReset(user, token)
    }
  }
}
