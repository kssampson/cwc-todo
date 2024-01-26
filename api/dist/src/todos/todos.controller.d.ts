import { CreateTodosDto } from './dto/createTodosDto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(createTodosDto: CreateTodosDto): string;
}
