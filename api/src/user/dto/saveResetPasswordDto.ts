import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import * as sanitizeHtml from 'sanitize-html';

export class SaveResetPasswordDto {

  @IsNotEmpty()
  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  password: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  token: string;

}