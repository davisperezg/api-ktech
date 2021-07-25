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
exports.ServiceSchema = exports.Service = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const category_schema_1 = require("../../category/schemas/category.schema");
let Service = class Service {
};
__decorate([
    mongoose_1.Prop({ trim: true, unique: true, uppercase: true }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ trim: true, uppercase: true }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }),
    __metadata("design:type", category_schema_1.Category)
], Service.prototype, "category", void 0);
__decorate([
    mongoose_1.Prop({ trim: true }),
    __metadata("design:type", Number)
], Service.prototype, "status", void 0);
Service = __decorate([
    mongoose_1.Schema({ timestamps: true, versionKey: false })
], Service);
exports.Service = Service;
exports.ServiceSchema = mongoose_1.SchemaFactory.createForClass(Service);
//# sourceMappingURL=service.schema.js.map