import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Project } from "src/projects/projects.entity";
import { SubTask } from "src/sub-task/sub-task.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column( {default: "To Do" })
  status: string;

  @OneToMany(() => SubTask, (subTask) => subTask.task)
  subTasks: SubTask[];
}