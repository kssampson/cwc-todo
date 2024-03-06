import { Injectable } from '@nestjs/common';
import { CreateTasksDto } from './dto/createTasksDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async getProjectTasks(id: number) {
    return await this.tasksRepository.find({ where : { project: { id } }, relations: ['sub-task'] })
  }

  async createTasks(createTasksDto: CreateTasksDto, userId: number) {
    const newTask = await this.tasksRepository.save({
      name: createTasksDto.name,
      description: createTasksDto.description,
      status: createTasksDto.status,
      project: { id: createTasksDto.projectId }
    })
    return await this.getProjectTasks(createTasksDto.projectId)
  }
}
