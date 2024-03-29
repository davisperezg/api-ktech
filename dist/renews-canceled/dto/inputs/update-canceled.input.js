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
exports.UpdateCanceledInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UpdateCanceledInput = class UpdateCanceledInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsMongoId({ message: 'El ID del usuario no es válido' }),
    class_validator_1.IsNotEmpty({ message: 'El ID del usuario no existe' }),
    __metadata("design:type", String)
], UpdateCanceledInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateCanceledInput.prototype, "status", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z0-9áéíóúÑñ\s-]+$/, {
        message: 'El nombre puede contener letras, numeros, guiones y espacios.',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el mensaje.' }),
    __metadata("design:type", String)
], UpdateCanceledInput.prototype, "message", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe ingresar la renovacion.' }),
    __metadata("design:type", String)
], UpdateCanceledInput.prototype, "renew", void 0);
UpdateCanceledInput = __decorate([
    graphql_1.InputType()
], UpdateCanceledInput);
exports.UpdateCanceledInput = UpdateCanceledInput;
//# sourceMappingURL=update-canceled.input.js.map