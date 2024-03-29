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

  async deleteAllItems(subTaskId: number) {
    const allItemsForOneSubTask = await this.getSubTaskItems(subTaskId);
    for (const item of allItemsForOneSubTask) {
      await this.itemRepository.remove(item)
    }
    const items = await this.getSubTaskItems(subTaskId);
    return items.length ? false : true;
  }

  async deleteSubTaskItem(subTaskId: number, itemId: number) {
    const itemToRemove = await this.itemRepository.find({ where: {id: itemId} })
    await this.itemRepository.remove(itemToRemove);
    return this.getSubTaskItems(subTaskId);
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
