import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Task } from './tasks/tasks.entity';
import { Project } from './projects/projects.entity';
import { ConfigService, ConfigModule } from '@nestjs/config'
import { MailModule } from './mail/mail.module';
import { SubTaskController } from './sub-task/sub-task.controller';
import { SubTaskService } from './sub-task/sub-task.service';
import { SubTaskModule } from './sub-task/sub-task.module';
import typeorm from './config/typeorm';
import { TasksService } from './tasks/tasks.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TasksModule,
    UserModule,
    ProjectsModule,
    AuthModule,
    MailModule,
    SubTaskModule,
    ItemModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//removed SubTaskService from controllers and providers array**