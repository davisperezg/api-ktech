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
exports.CreateVehicleInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateVehicleInput = class CreateVehicleInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completer el cliente.' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "customer", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completer el dispositivo.' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "device", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completer el plan de facturación.' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "billing", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completer el tipo de plataforma.' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "platform", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completar la placa del vehiculo' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "plate", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completer el tipo de sim.' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "sim", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completar el número de gps' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "nroGPS", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty({ message: 'Debe completar la fecha de inicio' }),
    __metadata("design:type", String)
], CreateVehicleInput.prototype, "billigStart", void 0);
CreateVehicleInput = __decorate([
    graphql_1.InputType()
], CreateVehicleInput);
exports.CreateVehicleInput = CreateVehicleInput;
//# sourceMappingURL=create-vehicle.input.js.map