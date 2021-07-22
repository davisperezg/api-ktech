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
exports.CreateNameMenuDTO = exports.CreateMenuInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreateMenuInput = class CreateMenuInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z\s]+$/, {
        message: 'El nombre del menu solo puede contener letras',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 55),
    __metadata("design:type", String)
], CreateMenuInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z\s]+$/, {
        message: 'El link del menu solo puede contener letras',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 55),
    __metadata("design:type", String)
], CreateMenuInput.prototype, "link", void 0);
CreateMenuInput = __decorate([
    graphql_1.InputType()
], CreateMenuInput);
exports.CreateMenuInput = CreateMenuInput;
let CreateNameMenuDTO = class CreateNameMenuDTO {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z\s]+$/, {
        message: 'El nombre del menu solo puede contener letras',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 55),
    __metadata("design:type", String)
], CreateNameMenuDTO.prototype, "name", void 0);
CreateNameMenuDTO = __decorate([
    graphql_1.InputType()
], CreateNameMenuDTO);
exports.CreateNameMenuDTO = CreateNameMenuDTO;
//# sourceMappingURL=create-menu.input.js.map