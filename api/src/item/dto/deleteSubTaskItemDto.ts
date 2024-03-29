import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteSubTaskItemDto {

  @IsNumber()
  @IsNotEmpty()
  subTaskId: number;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;

}