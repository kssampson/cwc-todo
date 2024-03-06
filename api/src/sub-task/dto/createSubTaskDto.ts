import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreateSubTaskDto {

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string

  @IsNumber()
  @IsNotEmpty()
  taskId: number;

  @IsString()
  status: string;

}