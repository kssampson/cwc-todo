import { IsBoolean, IsNumber } from "class-validator";


export class CreateListDto {

  @IsNumber()
  userId: number;

  @IsBoolean()
  completed: boolean;
}