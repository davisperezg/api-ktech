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
exports.CanceledType = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const renew_type_1 = require("../../../renew/dto/querys/renew.type");
let CanceledType = class CanceledType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], CanceledType.prototype, "id", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CanceledType.prototype, "message", void 0);
__decorate([
    graphql_1.Field(() => renew_type_1.RenewType, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", renew_type_1.RenewType)
], CanceledType.prototype, "renew", void 0);
CanceledType = __decorate([
    graphql_1.InputType()
], CanceledType);
exports.CanceledType = CanceledType;
//# sourceMappingURL=canceled-types.js.map