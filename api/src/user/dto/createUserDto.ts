import { IsString, IsBoolean, isEmail, IsEmail, IsNumber, IsNotEmpty } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
import { Transform } from "class-transformer";
import * as sanitizeHtml from 'sanitize-html';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto){}
export class ForgotPasswordEmailDto extends PartialType(CreateUserDto){}