import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Projects } from "src/projects/projects.entity";

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Projects, project => project.todos)
  lists: Projects;

  @Column()
  todo: string;

  @Column()
  priority: boolean;

  @Column()
  completed: boolean;
}