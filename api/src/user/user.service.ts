import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './user.entity';
// import AppDataSource from 'db';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { throwError } from 'rxjs';
import { AccountDetailsDto } from './dto/accountDetailsDto';

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

  async findOneWithUserName(username: string) {
    return await this.userRepo.findOne( { where: {username: username} })
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPass = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPass;
    return await this.userRepo.insert(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto){
    return await this.userRepo.update(id, updateUserDto)
  }

  // findCorrectColumn = (columnName: string) => {
  //   if (this.userRepo.)
  // }

  async updateAccount(accoutDetailsDto: AccountDetailsDto) {
    await this.userRepo.update(accoutDetailsDto.id, { [`${accoutDetailsDto.fieldDesc}`]: `${accoutDetailsDto.newValue}` })
    const updatedUser = await this.userRepo.find({where: {id: accoutDetailsDto.id}});
    console.log('updatedUser: ', updatedUser)
    return {
      id: updatedUser[0].id,
      email: updatedUser[0].email,
      username: updatedUser[0].username
    }
  }

  async delete(id: number) {
    return await this.userRepo.delete(id);
  }
}
