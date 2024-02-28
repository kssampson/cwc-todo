import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import * as sanitizeHtml from 'sanitize-html';


export class CreateProjectsDto {

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  status: string;
}