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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AccessService = class AccessService {
    constructor(accessModel) {
        this.accessModel = accessModel;
    }
    async onModuleInit() {
        let countAccess;
        let valuesAccess;
        try {
            countAccess = await this.accessModel.estimatedDocumentCount();
        }
        catch (e) {
            throw new Error(`Error en AccessService.onModuleInit.Count ${e}`);
        }
        if (countAccess > 0)
            return;
        try {
            valuesAccess = await Promise.all([
                new this.accessModel({ name: 'Editar' }).save(),
                new this.accessModel({ name: 'Eliminar' }).save(),
                new this.accessModel({ name: 'Crear' }).save(),
                new this.accessModel({ name: 'Ver' }).save(),
            ]);
        }
        catch (e) {
            throw new Error(`Error en AccessService.onModuleInit.All ${e}`);
        }
        return valuesAccess;
    }
    async findAllAccess() {
        let findAccess;
        try {
            findAccess = await this.accessModel.find();
        }
        catch (e) {
            throw new Error(`Error en AccessService.findAllAccess ${e}`);
        }
        return findAccess;
    }
    async findOneAccessById(id) {
        let access;
        try {
            access = await this.accessModel.findById(id);
        }
        catch (e) {
            throw new Error(`Error en AccessService.findOneAccessById ${e}`);
        }
        if (!access)
            throw new common_1.NotFoundException(`El access no se encuentra o no existe`);
        return access;
    }
    async findAccessesByNames(param) {
        let accesses;
        try {
            accesses = await this.accessModel.find({ name: { $in: param } });
        }
        catch (e) {
            throw new Error(`Error en ModuleService.findModulesByNames ${e}`);
        }
        if (!accesses || accesses.length === 0)
            throw new common_1.NotFoundException({
                path: 'access',
                message: [`El tipo de acceso no se encuentra o no existe`],
            });
        return accesses;
    }
    async findIdsByNameAccess(accesses) {
        const getNameAccess = accesses.map((access) => access.name);
        const findAccessByName = await this.findAccessesByNames(getNameAccess);
        const getIdAccess = findAccessByName.map((access) => access._id);
        return getIdAccess;
    }
};
AccessService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Access')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AccessService);
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map