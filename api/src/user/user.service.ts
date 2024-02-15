import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './user.entity';
// import AppDataSource from 'db';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
constructor(@InjectRepository(User)private userRepo: Repository<User>) {}

  async findOne(id: number) {
    return await this.userRepo.findOne({ where : { id: id } });
  }

  async findOneWithEmail(email: string) {
    return await this.userRepo.findOneOrFail( { where: {email: email} })
    // return "monkey"
  }

  async findOneWithUserName(name: string) {
    return await this.userRepo.findOne( { where: {name: name} })
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPass = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPass;
    return await this.userRepo.insert(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto){
    return await this.userRepo.update(id, updateUserDto)
  }

  async delete(id: number) {
    return await this.userRepo.delete(id);
  }
}
