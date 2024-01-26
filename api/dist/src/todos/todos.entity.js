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
exports.Todos = void 0;
const typeorm_1 = require("typeorm");
const list_entity_1 = require("../list/list.entity");
let Todos = class Todos {
};
exports.Todos = Todos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Todos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => list_entity_1.List, list => list.todos),
    __metadata("design:type", list_entity_1.List)
], Todos.prototype, "lists", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Todos.prototype, "todo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Todos.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Todos.prototype, "completed", void 0);
exports.Todos = Todos = __decorate([
    (0, typeorm_1.Entity)()
], Todos);
//# sourceMappingURL=todos.entity.js.map