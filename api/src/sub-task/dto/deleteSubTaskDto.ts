import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class DeleteSubTaskDto {

  @IsNumber()
  @IsNotEmpty()
  taskId: number;

  @IsNumber()
  @IsNotEmpty()
  subTaskId: number;

}