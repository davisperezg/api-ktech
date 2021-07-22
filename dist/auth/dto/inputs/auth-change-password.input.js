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
exports.AuthChangePasswordInputToAdmin = exports.AuthChangePasswordInputToUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const match_decorator_1 = require("../../../lib/decorators/match.decorator");
const class_validator_1 = require("class-validator");
let AuthChangePasswordInputToUser = class AuthChangePasswordInputToUser {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AuthChangePasswordInputToUser.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener por lo menos una mayúscula y números',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 55, {
        message: 'La contraseña actual debe ser mayor a 5 caracteres',
    }),
    __metadata("design:type", String)
], AuthChangePasswordInputToUser.prototype, "currentPassword", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener por lo menos una mayúscula y números',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 55, {
        message: 'La nueva contraseña debe ser mayor a 5 caracteres',
    }),
    __metadata("design:type", String)
], AuthChangePasswordInputToUser.prototype, "newPassword", void 0);
__decorate([
    graphql_1.Field(),
    match_decorator_1.IsMatchPassword('newPassword', {
        message: 'La confirmación de contraseña no coincide con la nueva contraseña ingresada',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 55, {
        message: 'La confirmación de contraseña debe ser mayor a 5 caracteres',
    }),
    __metadata("design:type", String)
], AuthChangePasswordInputToUser.prototype, "confirmNewPassword", void 0);
AuthChangePasswordInputToUser = __decorate([
    graphql_1.InputType()
], AuthChangePasswordInputToUser);
exports.AuthChangePasswordInputToUser = AuthChangePasswordInputToUser;
let AuthChangePasswordInputToAdmin = class AuthChangePasswordInputToAdmin {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AuthChangePasswordInputToAdmin.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener por lo menos una mayúscula y números',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 55, {
        message: 'La nueva contraseña debe ser mayor a 5 caracteres',
    }),
    __metadata("design:type", String)
], AuthChangePasswordInputToAdmin.prototype, "newPassword", void 0);
__decorate([
    graphql_1.Field(),
    match_decorator_1.IsMatchPassword('newPassword', {
        message: 'La confirmación de contraseña no coincide con la nueva contraseña ingresada',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 55, {
        message: 'La confirmación de contraseña debe ser mayor a 5 caracteres',
    }),
    __metadata("design:type", String)
], AuthChangePasswordInputToAdmin.prototype, "confirmNewPassword", void 0);
AuthChangePasswordInputToAdmin = __decorate([
    graphql_1.InputType()
], AuthChangePasswordInputToAdmin);
exports.AuthChangePasswordInputToAdmin = AuthChangePasswordInputToAdmin;
//# sourceMappingURL=auth-change-password.input.js.map