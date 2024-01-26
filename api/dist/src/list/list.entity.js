"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const todos_entity_1 = require("../todos/todos.entity");
let List = class List {
};
exports.List = List;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], List.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.lists),
    __metadata("design:type", user_entity_1.User)
], List.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => todos_entity_1.Todos, (todos) => todos.lists),
    __metadata("design:type", Array)
], List.prototype, "todos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], List.prototype, "completed", void 0);
exports.List = List = __decorate([
    (0, typeorm_1.Entity)()
], List);
//# sourceMappingURL=list.entity.js.map