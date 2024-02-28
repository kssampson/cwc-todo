import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "src/user/user.entity";
import { Todos } from "src/todos/todos.entity";

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @ManyToMany(() => Todos, (todos) => todos.lists)
  todos: Todos[]

  @Column()
  status: string
}