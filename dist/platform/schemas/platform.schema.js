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
exports.PlatformSchema = exports.Platform = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Platform = class Platform {
};
__decorate([
    mongoose_1.Prop({ trim: true, unique: true }),
    __metadata("design:type", String)
], Platform.prototype, "name", void 0);
Platform = __decorate([
    mongoose_1.Schema({ timestamps: true, versionKey: false })
], Platform);
exports.Platform = Platform;
exports.PlatformSchema = mongoose_1.SchemaFactory.createForClass(Platform);
//# sourceMappingURL=platform.schema.js.map