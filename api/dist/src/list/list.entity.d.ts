import { User } from "src/user/user.entity";
import { Todos } from "src/todos/todos.entity";
export declare class List {
    id: number;
    userId: User;
    todos: Todos[];
    completed: boolean;
}
