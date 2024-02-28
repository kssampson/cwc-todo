import { Injectable } from '@nestjs/common';
import { CreateProjectsDto } from './dto/createProjectsDto';
import { Projects } from './projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { create } from 'domain';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>
  ) {}

  async getUserProjects(id: number) {
    return await this.projectsRepository.find({ where : { user: { id } } })
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

  async getProject(id: number) {

  }
}
