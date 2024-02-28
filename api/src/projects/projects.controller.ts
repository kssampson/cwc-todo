import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectsDto } from './dto/createProjectsDto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService){}
  // @Post()
  // create(@Body() createProjectsDto: CreateProjectsDto){
  //   // return this.projectsService.create(createProjectsDto);
  // }
}
