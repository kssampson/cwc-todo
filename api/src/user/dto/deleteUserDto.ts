import { IsString, IsEmail, IsNumber, IsNotEmpty } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
import { Transform } from "class-transformer";
import * as sanitizeHtml from 'sanitize-html';

export class DeleteUserDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  password: string;

}