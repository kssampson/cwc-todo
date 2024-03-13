import { Item } from "src/item/item.entity";
import { Task } from "src/tasks/tasks.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

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

  @OneToMany(() => Item, (item) => item.subTask)
  items: Item[];
}