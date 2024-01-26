import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { List } from "src/list/list.entity";

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => List, list => list.todos)
  lists: List;

  @Column()
  todo: string;

  @Column()
  priority: boolean;

  @Column()
  completed: boolean;
}