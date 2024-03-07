import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class EditSubTaskNameDto {

  @IsNumber()
  @IsNotEmpty()
  taskId: number;

  @IsNumber()
  @IsNotEmpty()
  subTaskId: number;

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  newValue: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class EditSubTaskDescriptionDto extends PartialType(EditSubTaskNameDto) {}