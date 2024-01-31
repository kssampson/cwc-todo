import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './user.entity';
// import AppDataSource from 'db';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
constructor(@InjectRepository(User)private userRepo: Repository<User>) {}

  findOne(id:string) {
    return {
      id: id
    }
  }

  async create(createUserDto: CreateUserDto) {
    // const userRepository = AppDataSource.getRepository(User);
    console.log('inside create user.service.ts', createUserDto)
    const hashedPass = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPass;
    await this.userRepo.insert(createUserDto);
  }
}
