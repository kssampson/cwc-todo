import { IsBoolean, IsString } from 'class-validator';

export class CreateTodosDto {

  @IsString()
    todo:string;

  @IsBoolean()
    priority:boolean;

  @IsBoolean()
    completed:boolean;
}