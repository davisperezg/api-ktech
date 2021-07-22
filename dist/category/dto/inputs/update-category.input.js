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
exports.UpdateCategoryInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let UpdateCategoryInput = class UpdateCategoryInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsMongoId({ message: 'El id recibido es incorrecto, actualizar página' }),
    class_validator_1.IsNotEmpty({ message: 'El id no puede estar vacio, actualizar página' }),
    __metadata("design:type", String)
], UpdateCategoryInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[A-Za-z\s]+$/, {
        message: 'La categoria solo puede contener letras',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' }),
    __metadata("design:type", String)
], UpdateCategoryInput.prototype, "name", void 0);
UpdateCategoryInput = __decorate([
    graphql_1.InputType()
], UpdateCategoryInput);
exports.UpdateCategoryInput = UpdateCategoryInput;
//# sourceMappingURL=update-category.input.js.map