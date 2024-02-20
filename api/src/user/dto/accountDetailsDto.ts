import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import * as sanitizeHtml from 'sanitize-html';


export class AccountDetailsDto {

  @IsString()
  fieldDesc: string;

  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  userDetail: string;

  @IsString()
  @Transform((params) => sanitizeHtml(params.value))
  newValue: string

}