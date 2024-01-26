import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/createListDto';

@Injectable()
export class ListService {
  create(createListDto: CreateListDto) {
    return 'dummy message: the list is created'
  }
}
