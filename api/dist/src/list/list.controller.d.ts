import { CreateListDto } from './dto/createListDto';
import { ListService } from './list.service';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    create(createListDto: CreateListDto): string;
}
