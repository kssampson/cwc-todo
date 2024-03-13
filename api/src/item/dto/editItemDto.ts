import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class EditItemDto {

  @IsNumber()
  @IsNotEmpty()
  subTaskId: number;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  newValue: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}