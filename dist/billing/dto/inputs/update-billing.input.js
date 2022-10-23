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
exports.UpdateBillingInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UpdateBillingInput = class UpdateBillingInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsMongoId({ message: 'El ID del plan de facturación no es válido' }),
    class_validator_1.IsNotEmpty({ message: 'El ID del plan de facturación no existe' }),
    __metadata("design:type", String)
], UpdateBillingInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    class_validator_1.Matches(/^[A-Za-záéíóúÑñ\s]+$/, {
        message: 'El nombre solo puede contener letras.',
    }),
    class_validator_1.Length(3, 55, { message: 'El nombre debe tener entre 3-55 caracteres.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateBillingInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateBillingInput.prototype, "day", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateBillingInput.prototype, "price", void 0);
UpdateBillingInput = __decorate([
    graphql_1.InputType()
], UpdateBillingInput);
exports.UpdateBillingInput = UpdateBillingInput;
//# sourceMappingURL=update-billing.input.js.map