import { IsString, IsBoolean, isEmail, IsEmail, IsNumber } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'

export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  signedIn: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}