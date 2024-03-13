import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto, ForgotPasswordEmailDto} from 'src/user/dto/createUserDto';
import { SaveResetPasswordDto } from 'src/user/dto/saveResetPasswordDto';
import { DeleteUserDto } from 'src/user/dto/deleteUserDto';
import { UserService } from 'src/user/user.service';
// import { JwtGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AccountDetailsDto } from 'src/user/dto/accountDetailsDto';
import { CreateProjectsDto } from 'src/projects/dto/createProjectsDto';
import { CreateTasksDto } from 'src/tasks/dto/createTasksDto';
import { CreateSubTaskDto } from 'src/sub-task/dto/createSubTaskDto';
import { DeleteSubTaskDto } from 'src/sub-task/dto/deleteSubTaskDto';
import { EditSubTaskDescriptionDto, EditSubTaskNameDto } from 'src/sub-task/dto/editSubTaskNameDto';
import { EditItemDto } from 'src/item/dto/editItemDto';
import { ItemService } from 'src/item/item.service';
import { CreateItemDto } from 'src/item/dto/createItemDto';
import { create } from 'domain';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private itemService: ItemService
    ){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    console.log('hello')
    return await this.userService.create(createUserDto);
  }

  // @UseGuards(JwtGuard)
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfileData(@Request() req) {
    return await this.authService.getProfileData(req.user.email);
  }

  @UseGuards(AuthGuard)
  @Post('edit-account')
  async editAccountDetail(@Body() accountDetailsDto: AccountDetailsDto) {
    return this.authService.editAccountDetail(accountDetailsDto);
  }

  @Post('reset-password')
  async sendResetPasswordEmail(@Body() forgotPasswordEmailDto: ForgotPasswordEmailDto) {
    return this.authService.sendResetPasswordEmail(forgotPasswordEmailDto);
  }

  @Post('save-reset-password')
  async saveResetPassword(@Body() saveResetPasswordDto: SaveResetPasswordDto) {
    return this.authService.saveResetPassword(saveResetPasswordDto);
  }


  @UseGuards(AuthGuard)
  @Post('delete-account')
  async deleteAccount(@Body() deleteUserDto: DeleteUserDto) {
    return await this.authService.deleteAccount(deleteUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('user-projects')
  async getUserProjects(@Request() req) {
    const user = await this.authService.getProfileData(req.user.email);
    const projects = await this.authService.getUserProjects(user.id);
    return {
      user,
      projects
    }
  }

  @UseGuards(AuthGuard)
  @Get('project/:id')
  async getProject(@Param('id') id: number, @Request() req) {
    // console.log('id: ', id)
    // console.log('req.user', req.user)
    const user = await this.authService.getProfileData(req.user.email);
    return await this.authService.getProject(user.id, id);
  }

  @UseGuards(AuthGuard)
  @Post('create-project')
  async createProject(@Body() createProjectsDto: CreateProjectsDto, @Request() req) {
    return await this.authService.createProject(createProjectsDto)
  }

  @UseGuards(AuthGuard)
  @Post('create-tasks')
  async createTasks(@Body() createTasksDto: CreateTasksDto, @Request() req) {
    const user = await this.authService.getProfileData(req.user.email);
    return await this.authService.createTasks(createTasksDto, user.id)
  }

  @UseGuards(AuthGuard)
  @Post('create-sub-task')
  async createSubTask(@Body() createSubTaskDto: CreateSubTaskDto, @Request() req) {
    const user = await this.authService.getProfileData(req.user.email);
    return await this.authService.createSubTask(createSubTaskDto, user.id)
  }

  @UseGuards(AuthGuard)
  @Delete('delete-sub-task')
  async deleteSubTask(@Body() deleteSubTaskDto: DeleteSubTaskDto, @Request() req) {
    const user = await this.authService.getProfileData(req.user.email);
    return await this.authService.deleteSubTask(deleteSubTaskDto.taskId, deleteSubTaskDto.subTaskId, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('edit-sub-task-name')
  async editSubTaskName(@Body() editSubTaskNameDto: EditSubTaskNameDto, @Request() req) {
    const user = await this.authService.getProfileData(req.user.email);

    return await this.authService.editSubTaskName(editSubTaskNameDto.taskId, editSubTaskNameDto.subTaskId, editSubTaskNameDto.newValue)
  }

  @UseGuards(AuthGuard)
  @Patch('edit-sub-task-description')
  async editSubTaskDescription(@Body() editSubTaskDescriptionDto: EditSubTaskDescriptionDto, @Request() req) {
    const user = await this.authService.getProfileData(req.user.email);

    return await this.authService.editSubTaskDescription(editSubTaskDescriptionDto.taskId, editSubTaskDescriptionDto.subTaskId, editSubTaskDescriptionDto.newValue)
  }

  @UseGuards(AuthGuard)
  @Post('create-sub-task-item')
  async createSubTaskItem(@Body() createItemDto: CreateItemDto, @Request() req) {
    const user = await this.authService.getProfileData(req.user.email);
    return await this.itemService.createSubTaskItem(createItemDto.description, createItemDto.status, createItemDto.subTaskId, user.id)
  }

  @UseGuards(AuthGuard)
  @Patch('edit-item-description')
  async editItemDescription(@Body() editItemDto: EditItemDto, @Request() req) {
    // console.log(editItemDto)
    // const user = await this.authService.getProfileData(req.user.email);
      return await this.itemService.editItemDescription(editItemDto.subTaskId, editItemDto.itemId, editItemDto.newValue);
  }
}
