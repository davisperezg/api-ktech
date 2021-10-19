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
exports.CustomerSchema = exports.Customer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Customer = class Customer {
};
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Customer.prototype, "lastName", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Customer.prototype, "document", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Customer.prototype, "numDocument", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Customer.prototype, "cellphone_1", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Customer.prototype, "cellphone_2", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", String)
], Customer.prototype, "direction", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", String)
], Customer.prototype, "username", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Number)
], Customer.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Date)
], Customer.prototype, "fecha_nac", void 0);
Customer = __decorate([
    mongoose_1.Schema({ timestamps: true, versionKey: false })
], Customer);
exports.Customer = Customer;
exports.CustomerSchema = mongoose_1.SchemaFactory.createForClass(Customer);
//# sourceMappingURL=customer.schema.js.map