import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubTask } from './sub-task.entity';
import { CreateSubTaskDto } from './dto/createSubTaskDto';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class SubTaskService {
  constructor(
    private itemService: ItemService,
    @InjectRepository(SubTask)
    private subTaskRepository: Repository<SubTask>,
  ) {}

  async getSubTasks(id: number) {
    return await this.subTaskRepository.find({ where : { task: { id } }, relations: ['items'] })
  }

  async createSubTask(createSubTaskDto: CreateSubTaskDto, taskId: number) {
    const newTask = await this.subTaskRepository.save({
      name: createSubTaskDto.name,
      description: createSubTaskDto.description,
      status: createSubTaskDto.status,
      task: { id: createSubTaskDto.taskId }
    })
    const subTasks = await this.getSubTasks(createSubTaskDto.taskId)
    return subTasks;
  }

  async deleteSubTask(taskId: number, subTaskId: number) {
    const subTaskToDelete = await this.subTaskRepository.findOne( { where: {id: subTaskId}} )
    if (!subTaskToDelete) {
      throw new Error('sub task does not exist!')
    } else {
      // const itemsBelongingToSubTask = await this.itemService.getSubTaskItems(subTaskId)
      const itemsRemoved = await this.itemService.deleteAllItems(subTaskId);
      if (itemsRemoved) {
      const deleteRespsonse = await this.subTaskRepository.remove(subTaskToDelete);
      const subTasks = await this.getSubTasks(taskId)
      return subTasks;
      } else {
        throw new Error('Unable to remove all associated items, cannot delete subTask!')
      }
    }
  }

  async editSubTaskName(taskId: number, subTaskId: number, newValue: string) {
    const subTaskToEdit = await this.subTaskRepository.findOne( { where: {id: subTaskId}} )
    if (!subTaskToEdit) {
      throw new Error('sub task does not exist!')
    } else {
      return await this.subTaskRepository.update(subTaskId, {name: newValue});
    }
  }

  async editSubTaskDescription(taskId: number, subTaskId: number, newValue: string) {
    const subTaskToEdit = await this.subTaskRepository.findOne( { where: {id: subTaskId}} )
    if (!subTaskToEdit) {
      throw new Error('sub task does not exist!')
    } else {
      return await this.subTaskRepository.update(subTaskId, {description: newValue});
    }
  }
}
