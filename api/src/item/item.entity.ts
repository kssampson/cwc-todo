import { SubTask } from "src/sub-task/sub-task.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubTask, (subTask) => subTask.items)
  subTask: SubTask;

  @Column({ nullable: true })
  description?: string;

  @Column( {default: "To Do" })
  status: string;
}