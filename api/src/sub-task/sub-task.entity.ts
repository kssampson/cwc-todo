import { Task } from "src/tasks/tasks.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class SubTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.subTasks)
  task: Task;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column( {default: "To Do" })
  status: string;
}