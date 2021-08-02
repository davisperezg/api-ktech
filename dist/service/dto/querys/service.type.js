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
exports.ServiceType = void 0;
const category_type_1 = require("./../../../category/dto/querys/category.type");
const graphql_1 = require("@nestjs/graphql");
let ServiceType = class ServiceType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], ServiceType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], ServiceType.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ServiceType.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], ServiceType.prototype, "price", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ServiceType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ServiceType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => category_type_1.CategoryType, { nullable: true }),
    __metadata("design:type", category_type_1.CategoryType)
], ServiceType.prototype, "category", void 0);
ServiceType = __decorate([
    graphql_1.ObjectType()
], ServiceType);
exports.ServiceType = ServiceType;
//# sourceMappingURL=service.type.js.map