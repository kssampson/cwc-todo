import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CreateTodosDto } from './dto/createTodosDto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService){}

  @Post()
  create(@Body() createTodosDto: CreateTodosDto) {
    return this.todosService.create(createTodosDto);
  }
  // @Get()
  // @Patch()
  // @Put()
  // @Delete
}
