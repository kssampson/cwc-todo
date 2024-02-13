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
import { ConfigService, ConfigModule } from '@nestjs/config'
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
    TodosModule,
    UserModule,
    ListModule,
    AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

