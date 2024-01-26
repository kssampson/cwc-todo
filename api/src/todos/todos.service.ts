import { Injectable } from '@nestjs/common';
import { CreateTodosDto } from './dto/createTodosDto';

@Injectable()
export class TodosService {
  create(createTodosDto: CreateTodosDto) {
    return "The todo was created"
    //this is where the typeORM logic should go to insert into the database
  }
}
