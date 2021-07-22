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
exports.UpdateAccessModuleInput = exports.UpdateModuleInput = void 0;
const update_menu_input_1 = require("./../../../menu/dto/inputs/update-menu.input");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let UpdateModuleInput = class UpdateModuleInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsMongoId({ message: 'El id recibido es incorrecto, actualizar página' }),
    class_validator_1.IsNotEmpty({ message: 'El id no puede estar vacio, actualizar página' }),
    __metadata("design:type", String)
], UpdateModuleInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ0-9\s]+$/, {
        message: 'El nombre del modulo solo puede contener letras y números',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(3, 55, { message: 'El nombre debe ser mayor a 2 caracteres' }),
    __metadata("design:type", String)
], UpdateModuleInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ,.0-9\s]+$/, {
        message: 'La descripción solo puede contener letras, números y algunos caracteres permitidos.',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(3, 150, {
        message: 'La descripción debe tener entre 3-150 caracteres.',
    }),
    __metadata("design:type", String)
], UpdateModuleInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [UpdateAccessModuleInput], { nullable: true }),
    __metadata("design:type", Array)
], UpdateModuleInput.prototype, "access", void 0);
__decorate([
    graphql_1.Field(() => [update_menu_input_1.UpdateNameMenuDTO], { nullable: true }),
    __metadata("design:type", Array)
], UpdateModuleInput.prototype, "menus", void 0);
UpdateModuleInput = __decorate([
    graphql_1.InputType()
], UpdateModuleInput);
exports.UpdateModuleInput = UpdateModuleInput;
let UpdateAccessModuleInput = class UpdateAccessModuleInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z\s]+$/, {
        message: 'El nombre del acceso solo puede contener letras',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 55),
    __metadata("design:type", String)
], UpdateAccessModuleInput.prototype, "name", void 0);
UpdateAccessModuleInput = __decorate([
    graphql_1.InputType()
], UpdateAccessModuleInput);
exports.UpdateAccessModuleInput = UpdateAccessModuleInput;
//# sourceMappingURL=update-module.input.js.map