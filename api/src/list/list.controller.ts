import { Body, Controller, Post } from '@nestjs/common';
import { CreateListDto } from './dto/createListDto';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService){}
  @Post()
  create(@Body() createListDto: CreateListDto){
    return this.listService.create(createListDto);
  }
}
