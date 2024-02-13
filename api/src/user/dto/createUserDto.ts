import { IsString, IsBoolean, isEmail, IsEmail, IsNumber, IsNotEmpty } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
import { Transform } from "class-transformer";
import * as sanitizeHtml from 'sanitize-html';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  name: string;

  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  signedIn: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}