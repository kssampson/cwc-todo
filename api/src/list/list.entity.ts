import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "src/user/user.entity";
import { Todos } from "src/todos/todos.entity";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.lists)
  userId: User;

  @ManyToMany(() => Todos, (todos) => todos.lists)
  todos: Todos[]

  @Column()
  completed: boolean
}