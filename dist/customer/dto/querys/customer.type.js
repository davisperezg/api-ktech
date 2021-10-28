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
exports.CustomerType = void 0;
const graphql_1 = require("@nestjs/graphql");
let CustomerType = class CustomerType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "id", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "document", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "numDocument", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "cellphone_1", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "cellphone_2", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "direction", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "username", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerType.prototype, "password", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], CustomerType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], CustomerType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], CustomerType.prototype, "fecha_nac", void 0);
CustomerType = __decorate([
    graphql_1.ObjectType()
], CustomerType);
exports.CustomerType = CustomerType;
//# sourceMappingURL=customer.type.js.map