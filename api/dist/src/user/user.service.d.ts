import { CreateUserDto } from './dto/createUserDto';
export declare class UserService {
    findOne(id: string): {
        id: string;
    };
    create(createUserDto: CreateUserDto): Promise<void>;
}
