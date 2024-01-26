import { IsString, IsBoolean, isEmail, IsEmail, IsNumber } from "class-validator";

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