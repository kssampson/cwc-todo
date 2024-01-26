"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_entity_1 = require("./src/list/list.entity");
const todos_entity_1 = require("./src/todos/todos.entity");
const user_entity_1 = require("./src/user/user.entity");
const typeorm_1 = require("typeorm");
require('dotenv').config();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User, list_entity_1.List, todos_entity_1.Todos],
    synchronize: true
});
exports.default = AppDataSource;
//# sourceMappingURL=db.js.map