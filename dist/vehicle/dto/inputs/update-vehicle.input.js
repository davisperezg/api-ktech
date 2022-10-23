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
exports.UpdateVehicleInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UpdateVehicleInput = class UpdateVehicleInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    class_validator_1.IsMongoId({ message: 'El ID del vehiculo no es válido' }),
    class_validator_1.IsNotEmpty({ message: 'El ID del vehiculo no existe' }),
    __metadata("design:type", String)
], UpdateVehicleInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateVehicleInput.prototype, "customer", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateVehicleInput.prototype, "device", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateVehicleInput.prototype, "platform", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.Matches(/^[A-Za-z0-9]+$/, {
        message: 'La placa solo permite letras y numeros, los - se no aceptan',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateVehicleInput.prototype, "plate", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateVehicleInput.prototype, "sim", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateVehicleInput.prototype, "nroGPS", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], UpdateVehicleInput.prototype, "retired", void 0);
UpdateVehicleInput = __decorate([
    graphql_1.InputType()
], UpdateVehicleInput);
exports.UpdateVehicleInput = UpdateVehicleInput;
//# sourceMappingURL=update-vehicle.input.js.map