import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { SubTask } from './sub-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubTask])],
  controllers: [SubTaskController],
  providers: [SubTaskService],
  exports: [SubTaskService]
})
export class SubTaskModule {}
