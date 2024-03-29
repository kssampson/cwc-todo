import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { SubTask } from './sub-task.entity';
import { ItemService } from 'src/item/item.service';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubTask]), ItemModule],
  controllers: [SubTaskController],
  providers: [SubTaskService],
  exports: [SubTaskService]
})
export class SubTaskModule {}
