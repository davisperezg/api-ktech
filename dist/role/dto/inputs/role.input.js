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
exports.CreateRoleUserInput = exports.RoleInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const create_module_input_1 = require("../../../modules/dto/inputs/create-module.input");
let RoleInput = class RoleInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ0-9\s]+$/, {
        message: 'El nombre del rol solo puede contener letras y números',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' }),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el nombre' }),
    __metadata("design:type", String)
], RoleInput.prototype, "name", void 0);
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
], RoleInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [create_module_input_1.CreateRoleModuleInput]),
    __metadata("design:type", Array)
], RoleInput.prototype, "modules", void 0);
RoleInput = __decorate([
    graphql_1.InputType()
], RoleInput);
exports.RoleInput = RoleInput;
let CreateRoleUserInput = class CreateRoleUserInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z0-9\s]+$/, {
        message: 'El nombre del rol solo puede contener letras y números',
    }),
    class_validator_1.Length(3, 55),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateRoleUserInput.prototype, "name", void 0);
CreateRoleUserInput = __decorate([
    graphql_1.InputType()
], CreateRoleUserInput);
exports.CreateRoleUserInput = CreateRoleUserInput;
//# sourceMappingURL=role.input.js.map