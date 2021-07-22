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
exports.ModuleType = void 0;
const menu_type_1 = require("./../../../menu/dto/querys/menu.type");
const access_type_1 = require("./../../../access/dto/querys/access.type");
const graphql_1 = require("@nestjs/graphql");
let ModuleType = class ModuleType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], ModuleType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], ModuleType.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ModuleType.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ModuleType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ModuleType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => [access_type_1.AccessType]),
    __metadata("design:type", Array)
], ModuleType.prototype, "access", void 0);
__decorate([
    graphql_1.Field(() => [menu_type_1.MenuType]),
    __metadata("design:type", Array)
], ModuleType.prototype, "menus", void 0);
ModuleType = __decorate([
    graphql_1.ObjectType()
], ModuleType);
exports.ModuleType = ModuleType;
//# sourceMappingURL=module.type.js.map