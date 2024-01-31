import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Todos } from './todos/todos.entity';
import { List } from './list/list.entity';
require ('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, List, Todos],
    synchronize: true}),
    TodosModule,
    UserModule,
    ListModule,
    AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

