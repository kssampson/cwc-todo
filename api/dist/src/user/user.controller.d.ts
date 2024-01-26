import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(id: string): {
        id: string;
    };
    create(createUserDto: CreateUserDto): Promise<void>;
}
