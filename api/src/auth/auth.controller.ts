import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto, ForgotPasswordEmailDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
// import { JwtGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AccountDetailsDto } from 'src/user/dto/accountDetailsDto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    ){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    console.log('hello')
    return await this.userService.create(createUserDto);
  }

  // @UseGuards(JwtGuard)
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfileData(@Request() req) {
    return await this.authService.getProfileData(req.user.email);
  }

  @UseGuards(AuthGuard)
  @Post('edit-account')
  async editAccountDetail(@Body() accountDetailsDto: AccountDetailsDto) {
    return this.authService.editAccountDetail(accountDetailsDto);
  }

  @Post('reset-password')
  async sendResetPasswordEmail(@Body() forgotPasswordEmailDto: ForgotPasswordEmailDto) {
    // console.log('forgotPasswordEmailDto in auth.controller: ', forgotPasswordEmailDto)
    return this.authService.sendResetPasswordEmail(forgotPasswordEmailDto);
  }
}
