import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountDetailsDto } from 'src/user/dto/accountDetailsDto';
import { ForgotPasswordEmailDto} from 'src/user/dto/createUserDto';
import { SaveResetPasswordDto } from 'src/user/dto/saveResetPasswordDto'
import { MailService } from 'src/mail/mail.service';
import { DeleteUserDto } from 'src/user/dto/deleteUserDto';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateProjectsDto } from 'src/projects/dto/createProjectsDto';
import { CreateTasksDto } from 'src/tasks/dto/createTasksDto';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateSubTaskDto } from 'src/sub-task/dto/createSubTaskDto';
import { SubTaskService } from 'src/sub-task/sub-task.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private projectsService: ProjectsService,
    private subTaskService: SubTaskService,
    private tasksService: TasksService,
    private mailService: MailService,
    private jwtService: JwtService
    ) {}

  async validateUser(name: string, password: string) {
    const user = await this.userService.findOneWithUserName(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async creatAccessToken(user, secret?: string) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name
      }
    };
    if (secret) {
      return await this.jwtService.signAsync(payload, {
        secret,
        expiresIn: "10m",
      })
    } else {
      return {
        ...user,
        accessToken: await this.jwtService.signAsync(payload)
      }
    }
  }

  async login(user: User) {
    return this.creatAccessToken(user)
  }

  async getProfileData(email: string) {
    const user = await this.userService.findOneWithEmail(email);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    }
  }

  async editAccountDetail(accountDetailsDto: AccountDetailsDto) {
    if (accountDetailsDto.fieldDesc === 'password') {
      accountDetailsDto.newValue = await bcrypt.hash(accountDetailsDto.newValue, 10);
    }
    return this.userService.updateAccount(accountDetailsDto);
  }

  async sendResetPasswordEmail(forgotPasswordEmailDto: ForgotPasswordEmailDto) {
    const user = await this.userService.findOneWithEmail(forgotPasswordEmailDto.email)
    if (!user) {
      throw new BadRequestException('Email not found!')
    } else {
      //create jwt w/ current hashed password
      const token = await this.creatAccessToken(user, user.password)
      //send email to user w/ link to reset password page w/ the jwt and user.id as params
      return await this.mailService.sendPasswordEmailReset(user, token)
    }
  }

  async saveResetPassword(saveResetPasswordDto: SaveResetPasswordDto) {
    return this.userService.saveResetPassword(saveResetPasswordDto);
  }

  async deleteAccount(deleteUserDto: DeleteUserDto) {
    const isUser = await this.validateUser(deleteUserDto.username, deleteUserDto.password);
    if (isUser) {
      return await this.userService.delete(deleteUserDto.id);
    } else {
      return null;
    }
  }

  async createProject(createProjectsDto: CreateProjectsDto) {
    return await this.projectsService.createProject(createProjectsDto)
  }

  async getUserProjects(id: number) {
    return await this.projectsService.getUserProjects(id)
  }

  async getProject(userId: number, id: number) {
    const projects = await this.projectsService.getUserProjects(userId)
    return projects.filter((project) => project.id === id)
  }

  async createTasks(createTasksDto: CreateTasksDto, userId: number) {
    const projects = await this.projectsService.getUserProjects(userId)
    const project = projects.find((project) => project.id === createTasksDto.projectId);
    if (project) {
      return await this.tasksService.createTasks(createTasksDto, userId)
    } else {
      throw new UnauthorizedException('Project not found')
    }
  }

  async createSubTask(createSubTaskDto: CreateSubTaskDto, userId: number) {
    const projects = await this.projectsService.getUserProjects(userId)
    const tasks = projects.map((project) => project.tasks)
    const taskId = tasks[0].filter((task) => task.id === createSubTaskDto.taskId)[0].id;
    if (taskId) {
      return await this.subTaskService.createSubTask(createSubTaskDto, taskId)
    } else {
      throw new UnauthorizedException('Project not found')
    }
  }

  async deleteSubTask(taskId: number, subTaskId: number, userId: number) {
    return await this.subTaskService.deleteSubTask(taskId, subTaskId)
  }

  async editSubTaskName(taskId: number, subTaskId, newValue: string) {
    return await this.subTaskService.editSubTaskName(taskId, subTaskId, newValue);
  }

  async editSubTaskDescription(taskId: number, subTaskId, newValue: string) {
    return await this.subTaskService.editSubTaskDescription(taskId, subTaskId, newValue);
  }

}