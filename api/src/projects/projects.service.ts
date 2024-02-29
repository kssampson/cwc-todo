import { Injectable } from '@nestjs/common';
import { CreateProjectsDto } from './dto/createProjectsDto';
import { Project } from './projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { create } from 'domain';
import { CreateTasksDto } from 'src/tasks/dto/createTasksDto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  async getUserProjects(id: number) {
    return await this.projectsRepository.find({ where : { user: { id } }, relations: ['tasks'] })
  }

  async createProject(createProjectsDto: CreateProjectsDto) {
    // console.log('createProjectsDto in projects.service: ', createProjectsDto)
    const newProject = await this.projectsRepository.save({
      name: createProjectsDto.name,
      description: createProjectsDto.description,
      status: createProjectsDto.status,
      user: { id: createProjectsDto.id }
    })
    return await this.getUserProjects(createProjectsDto.id)
  }

  // async getProject(id: number) {

  // }
}
