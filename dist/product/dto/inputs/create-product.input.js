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
exports.CreateProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateProductInput = class CreateProductInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completar la categoria' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "category", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completar la marca' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "brand", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el modelo' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "model", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z0-9áéíóúÑñ\s]+$/, {
        message: 'El nombre solo puede contener letras y numeros',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el producto' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[^$%&|<>#]*$/, {
        message: 'La descripción permite solo algunos caracteres permitidos',
    }),
    class_validator_1.Length(3, 55, { message: 'La descripción debe ser mayor a 2 caracteres' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar la descripción del producto' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNumberString({}, { message: 'El precio solo permite números.' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el precio del producto' }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "price", void 0);
CreateProductInput = __decorate([
    graphql_1.InputType()
], CreateProductInput);
exports.CreateProductInput = CreateProductInput;
//# sourceMappingURL=create-product.input.js.map