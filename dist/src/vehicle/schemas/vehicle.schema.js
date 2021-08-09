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
exports.VehicleSchema = exports.Vehicle = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const billing_schema_1 = require("../../billing/schemas/billing.schema");
const customer_schema_1 = require("../../../customer/schemas/customer.schema");
const device_schema_1 = require("../../device/schemas/device.schema");
let Vehicle = class Vehicle {
};
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }),
    __metadata("design:type", customer_schema_1.Customer)
], Vehicle.prototype, "customer", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }),
    __metadata("design:type", device_schema_1.Device)
], Vehicle.prototype, "device", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Billing' }),
    __metadata("design:type", billing_schema_1.Billing)
], Vehicle.prototype, "billing", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "plate", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "nroGPS", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Date)
], Vehicle.prototype, "billigStart", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Date)
], Vehicle.prototype, "billigEnd", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Number)
], Vehicle.prototype, "status", void 0);
Vehicle = __decorate([
    mongoose_1.Schema({ timestamps: true, versionKey: false })
], Vehicle);
exports.Vehicle = Vehicle;
exports.VehicleSchema = mongoose_1.SchemaFactory.createForClass(Vehicle);
//# sourceMappingURL=vehicle.schema.js.map