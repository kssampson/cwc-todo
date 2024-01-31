import { CreateUserDto } from './dto/createUserDto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    findOne(id: string): {
        id: string;
    };
    create(createUserDto: CreateUserDto): Promise<void>;
}
