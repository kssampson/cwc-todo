import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CreateTasksDto } from './dto/createTasksDto';
import { TasksService } from './tasks.service';

@Controller('todos')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  // @Post()
  // create(@Body() createTasksDto: CreateTasksDto) {
  //   return this.tasksService.createTasks(createTasksDto);
  // }
  // @Get()
  // @Patch()
  // @Put()
  // @Delete
}
