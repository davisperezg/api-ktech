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
exports.UserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../../lib/decorators/match.decorator");
const role_input_1 = require("../../../role/dto/inputs/role.input");
let UserInput = class UserInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
        message: 'El nombre solo puede contener letras',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el nombre' }),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
        message: 'El apellido solo puede contener letras',
    }),
    class_validator_1.Length(3, 55, { message: 'El apellido debe ser mayor a 2 caracteres' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el apellido' }),
    __metadata("design:type", String)
], UserInput.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el rol' }),
    __metadata("design:type", role_input_1.CreateRoleUserInput)
], UserInput.prototype, "role", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsEmail({}, { message: 'El correo debe ser válido' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el correo' }),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener por lo menos una mayúscula y números',
    }),
    class_validator_1.Length(6, 55, { message: 'Contraseña debe ser mayor a 5 caracteres' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar la contraseña' }),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
__decorate([
    graphql_1.Field(),
    match_decorator_1.IsMatchPassword('password', {
        message: 'La confirmación de contraseña no coincide con la contraseña ingresada',
    }),
    class_validator_1.Length(6, 55, {
        message: 'Repetir contraseña debe ser mayor a 5 caracteres',
    }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar la confirmación de contraseña' }),
    __metadata("design:type", String)
], UserInput.prototype, "confirmPassword", void 0);
UserInput = __decorate([
    graphql_1.InputType()
], UserInput);
exports.UserInput = UserInput;
//# sourceMappingURL=user.input.js.map