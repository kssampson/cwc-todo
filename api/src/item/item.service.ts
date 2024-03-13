import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>
  ) {}

  async editItemDescription(subTaskId: number, itemId: number, newValue: string) {
    await this.itemRepository.update(itemId, {description: newValue})
    const subTaskItems = await this.getSubTaskItems(subTaskId)
    return subTaskItems;
  }

  async getSubTaskItems(id: number){
    return this.itemRepository.find({ where : { subTask: { id } } })
  }

  async createSubTaskItem(description: string, status: string, subTaskId: number, userId: number) {
    const newSubTaskItem = await this.itemRepository.save({
      description: description,
      status: status,
      subTask: { id: subTaskId }
    })
    const subTaskItems = await this.getSubTaskItems(subTaskId)
    return subTaskItems;
  }
}
