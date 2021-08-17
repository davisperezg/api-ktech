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
exports.UpdateCustomerInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UpdateCustomerInput = class UpdateCustomerInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsMongoId({ message: 'El ID del cliente no es válido' }),
    class_validator_1.IsNotEmpty({ message: 'El ID del cliente no existe' }),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/(\W|^)(DNI|RUC)(\W|$)/, {
        message: 'El documento solo permite dos opciones. DNI o RUC.',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "document", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "numDocument", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-záéíóú.Ññ\s]+$/, {
        message: 'El nombre solo puede contener letras.',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
        message: 'El apellido solo puede contener letras.',
    }),
    class_validator_1.Length(3, 55, { message: 'El apellido debe tener entre 3-55 caracteres.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.MaxLength(9, { message: 'El celular debe contener 9 dígitos.' }),
    class_validator_1.MinLength(9, { message: 'El celular debe contener 9 dígitos.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "cellphone_1", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.MaxLength(9, { message: 'El celular opcional debe contener 9 dígitos.' }),
    class_validator_1.MinLength(9, { message: 'El celular opcional debe contener 9 dígitos.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "cellphone_2", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Length(3, 250, {
        message: 'La dirección debe tener entre 3-250 caracteres.',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "direction", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z0-9_áéíóúÑñ\s]+$/, {
        message: 'El usuario solo puede contener letras, numeros.',
    }),
    class_validator_1.Length(3, 20, { message: 'El usuario debe tener entre 3-20 caracteres.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z0-9_áéíóúÑñ\s]+$/, {
        message: 'El usuario solo puede contener letras, numeros.',
    }),
    class_validator_1.Length(3, 20, { message: 'La contraseña debe tener entre 3-20 caracteres.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "password", void 0);
UpdateCustomerInput = __decorate([
    graphql_1.InputType()
], UpdateCustomerInput);
exports.UpdateCustomerInput = UpdateCustomerInput;
//# sourceMappingURL=update-customer.input.js.map