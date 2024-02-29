import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreateTasksDto {

  @IsNotEmpty()
  @Transform((params) => sanitizeHtml(params.value))
  name: string

  @IsOptional()
  @Transform((params) => sanitizeHtml(params.value))
  description: string

  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsString()
  status: string;

  // @IsString()
  //   todo:string;

  // @IsBoolean()
  //   priority:boolean;

  // @IsBoolean()
  //   completed:boolean;
}