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
exports.CreateAccessModuleInput = exports.CreateRoleModuleInput = exports.CreateModuleInput = void 0;
const create_menu_input_1 = require("./../../../menu/dto/inputs/create-menu.input");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreateModuleInput = class CreateModuleInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ0-9\s]+$/, {
        message: 'El nombre del modulo solo puede contener letras y números',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el nombre' }),
    __metadata("design:type", String)
], CreateModuleInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ,.0-9\s]+$/, {
        message: 'La descripción solo puede contener letras, números y algunos caracteres permitidos.',
    }),
    class_validator_1.Length(3, 150, {
        message: 'La descripción debe tener entre 3-150 caracteres.',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateModuleInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [CreateAccessModuleInput]),
    __metadata("design:type", Array)
], CreateModuleInput.prototype, "access", void 0);
__decorate([
    graphql_1.Field(() => [create_menu_input_1.CreateNameMenuDTO]),
    __metadata("design:type", Array)
], CreateModuleInput.prototype, "menus", void 0);
CreateModuleInput = __decorate([
    graphql_1.InputType()
], CreateModuleInput);
exports.CreateModuleInput = CreateModuleInput;
let CreateRoleModuleInput = class CreateRoleModuleInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z0-9\s]+$/, {
        message: 'El nombre del modulo solo puede contener letras y números',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 55),
    __metadata("design:type", String)
], CreateRoleModuleInput.prototype, "name", void 0);
CreateRoleModuleInput = __decorate([
    graphql_1.InputType()
], CreateRoleModuleInput);
exports.CreateRoleModuleInput = CreateRoleModuleInput;
let CreateAccessModuleInput = class CreateAccessModuleInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z\s]+$/, {
        message: 'El nombre del acceso solo puede contener letras',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 55),
    __metadata("design:type", String)
], CreateAccessModuleInput.prototype, "name", void 0);
CreateAccessModuleInput = __decorate([
    graphql_1.InputType()
], CreateAccessModuleInput);
exports.CreateAccessModuleInput = CreateAccessModuleInput;
//# sourceMappingURL=create-module.input.js.map