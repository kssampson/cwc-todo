import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "src/projects/projects.entity";

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
}