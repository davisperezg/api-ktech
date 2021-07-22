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
exports.ModelType = void 0;
const graphql_1 = require("@nestjs/graphql");
const brand_type_1 = require("../../../brand/dto/querys/brand.type");
let ModelType = class ModelType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], ModelType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], ModelType.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ModelType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ModelType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => brand_type_1.BrandType, { nullable: true }),
    __metadata("design:type", brand_type_1.BrandType)
], ModelType.prototype, "brand", void 0);
ModelType = __decorate([
    graphql_1.ObjectType()
], ModelType);
exports.ModelType = ModelType;
//# sourceMappingURL=model.type.js.map