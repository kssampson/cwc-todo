"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const todos_module_1 = require("./todos/todos.module");
const user_module_1 = require("./user/user.module");
const list_module_1 = require("./list/list.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/user.entity");
const todos_entity_1 = require("./todos/todos.entity");
const list_entity_1 = require("./list/list.entity");
require('dotenv').config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({ type: "postgres",
                host: process.env.DB_HOST,
                port: parseInt(process.env.PORT),
                username: process.env.USER_NAME,
                password: process.env.PASSWORD,
                database: process.env.DB_NAME,
                entities: [user_entity_1.User, list_entity_1.List, todos_entity_1.Todos],
                synchronize: true }),
            todos_module_1.TodosModule,
            user_module_1.UserModule,
            list_module_1.ListModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map