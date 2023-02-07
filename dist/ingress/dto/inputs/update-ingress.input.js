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
exports.UpdateIngressInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UpdateIngressInput = class UpdateIngressInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsMongoId({ message: 'El ID del egreso no es válido' }),
    class_validator_1.IsNotEmpty({ message: 'El ID del egreso no existe' }),
    __metadata("design:type", String)
], UpdateIngressInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateIngressInput.prototype, "category", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
        message: 'El nombre solo puede contener letras.',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateIngressInput.prototype, "detail", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[A-Za-z0-9,.áéíóúÑñ\s]+$/, {
        message: 'La observación solo puede contener letras, numeros y algunos caracteres permitidos.',
    }),
    class_validator_1.Length(3, 500, {
        message: 'La observación debe tener entre 3-500 caracteres.',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateIngressInput.prototype, "observation", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsNumber({}, { message: 'La unidad solo permite números.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateIngressInput.prototype, "units", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsNumber({}, { message: 'El monto solo permite números.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateIngressInput.prototype, "amount", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateIngressInput.prototype, "user", void 0);
UpdateIngressInput = __decorate([
    graphql_1.InputType()
], UpdateIngressInput);
exports.UpdateIngressInput = UpdateIngressInput;
//# sourceMappingURL=update-ingress.input.js.map