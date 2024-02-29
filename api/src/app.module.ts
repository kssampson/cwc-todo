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
import typeorm from './config/typeorm';

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
    MailModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

