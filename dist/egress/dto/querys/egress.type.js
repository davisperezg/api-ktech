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
exports.EgressType = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_type_1 = require("../../../category/dto/querys/category.type");
const user_type_1 = require("../../../user/dto/querys/user.type");
let EgressType = class EgressType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], EgressType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], EgressType.prototype, "detail", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EgressType.prototype, "observation", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], EgressType.prototype, "units", void 0);
__decorate([
    graphql_1.Field(() => category_type_1.CategoryType, { nullable: true }),
    __metadata("design:type", category_type_1.CategoryType)
], EgressType.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], EgressType.prototype, "amount", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], EgressType.prototype, "total", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], EgressType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], EgressType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => user_type_1.UserType, { nullable: true }),
    __metadata("design:type", user_type_1.UserType)
], EgressType.prototype, "user", void 0);
EgressType = __decorate([
    graphql_1.ObjectType()
], EgressType);
exports.EgressType = EgressType;
//# sourceMappingURL=egress.type.js.map