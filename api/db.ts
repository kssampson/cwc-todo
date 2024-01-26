import { List } from "src/list/list.entity";
import { Todos } from "src/todos/todos.entity";
import { User } from "src/user/user.entity";
import { DataSource } from "typeorm";
require ('dotenv').config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, List, Todos],
    synchronize: true
})
//initialized in main.ts

export default AppDataSource;