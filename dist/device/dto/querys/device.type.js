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
exports.DeviceType = void 0;
const graphql_1 = require("@nestjs/graphql");
let DeviceType = class DeviceType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], DeviceType.prototype, "id", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], DeviceType.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], DeviceType.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], DeviceType.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], DeviceType.prototype, "commands", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], DeviceType.prototype, "commandsclient", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], DeviceType.prototype, "reference", void 0);
DeviceType = __decorate([
    graphql_1.ObjectType()
], DeviceType);
exports.DeviceType = DeviceType;
//# sourceMappingURL=device.type.js.map