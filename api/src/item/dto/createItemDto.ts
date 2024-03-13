import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreateItemDto {

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string

  @IsString()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  subTaskId: number;

}