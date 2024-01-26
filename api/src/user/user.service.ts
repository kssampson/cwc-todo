import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './user.entity';
import AppDataSource from 'db';

@Injectable()
export class UserService {
  findOne(id:string) {
    return {
      id: id
    }
  }
  async create(createUserDto: CreateUserDto) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.insert(createUserDto);
  }
}
