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
exports.CreateCategoryInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreateCategoryInput = class CreateCategoryInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z\s]+$/, {
        message: 'El nombre de la categoria solo puede contener letras',
    }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el nombre' }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' }),
    __metadata("design:type", String)
], CreateCategoryInput.prototype, "name", void 0);
CreateCategoryInput = __decorate([
    graphql_1.InputType()
], CreateCategoryInput);
exports.CreateCategoryInput = CreateCategoryInput;
//# sourceMappingURL=create-category.input.js.map