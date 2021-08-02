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
exports.IngressType = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_type_1 = require("../../../category/dto/querys/category.type");
const user_type_1 = require("../../../user/dto/querys/user.type");
let IngressType = class IngressType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], IngressType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], IngressType.prototype, "detail", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], IngressType.prototype, "observation", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], IngressType.prototype, "units", void 0);
__decorate([
    graphql_1.Field(() => category_type_1.CategoryType, { nullable: true }),
    __metadata("design:type", category_type_1.CategoryType)
], IngressType.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], IngressType.prototype, "amount", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], IngressType.prototype, "total", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], IngressType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], IngressType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => user_type_1.UserType, { nullable: true }),
    __metadata("design:type", user_type_1.UserType)
], IngressType.prototype, "user", void 0);
IngressType = __decorate([
    graphql_1.ObjectType()
], IngressType);
exports.IngressType = IngressType;
//# sourceMappingURL=ingress.type.js.map