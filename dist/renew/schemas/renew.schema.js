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
exports.RenewSchema = exports.Renew = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const billing_schema_1 = require("../../billing/schemas/billing.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
const vehicle_schema_1 = require("../../vehicle/schemas/vehicle.schema");
let Renew = class Renew {
};
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }),
    __metadata("design:type", vehicle_schema_1.Vehicle)
], Renew.prototype, "vehicle", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Billing' }),
    __metadata("design:type", billing_schema_1.Billing)
], Renew.prototype, "billing", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Renew.prototype, "registeredBy", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Renew.prototype, "updatedBy", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Date)
], Renew.prototype, "expirationDate", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Date)
], Renew.prototype, "renovationStart", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Date)
], Renew.prototype, "renovationEnd", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Number)
], Renew.prototype, "status", void 0);
Renew = __decorate([
    mongoose_1.Schema({ timestamps: true, versionKey: false })
], Renew);
exports.Renew = Renew;
exports.RenewSchema = mongoose_1.SchemaFactory.createForClass(Renew);
//# sourceMappingURL=renew.schema.js.map