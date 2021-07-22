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
exports.RoleService = void 0;
const constants_1 = require("./../../auth/constants");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const module_service_1 = require("../../modules/services/module.service");
const user_schema_1 = require("../../user/schemas/user.schema");
let RoleService = class RoleService {
    constructor(roleModel, moduleService) {
        this.roleModel = roleModel;
        this.moduleService = moduleService;
        this.findModuleSA = (items, value) => items.some((item) => item.name === value);
    }
    async createRole(roleInput, user) {
        const { name, modules } = roleInput;
        if (this.findModuleSA(modules, constants_1.moduleSA)) {
            throw new common_1.NotFoundException({
                path: 'module',
                message: [`Lo siento, no puedes agregar el modulo "Modulos".`],
            });
        }
        await this.findOneRoleByName(name, 'exist');
        const getIdModules = await this.moduleService.findIdsByNameModules(modules);
        const newRole = new this.roleModel(Object.assign(Object.assign({}, roleInput), { modules: getIdModules }));
        let saveRole;
        let foundRole;
        try {
            saveRole = await newRole.save();
        }
        catch (e) {
            throw new Error(`Error en RoleService.createRole ${e}`);
        }
        try {
            foundRole = await saveRole
                .populate([
                {
                    path: 'modules',
                    populate: {
                        path: 'menus',
                    },
                },
            ])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en RoleService.createRole.populate ${e}`);
        }
        return foundRole;
    }
    async updateRole(roleInput) {
        const { id, modules, name } = roleInput;
        let getIdsModules;
        let updateRole;
        let newModules;
        const findRoleIfExist = await this.findOneRoleById(id);
        if (name && findRoleIfExist.name === constants_1.roleSA) {
            roleInput = Object.assign(Object.assign({}, roleInput), { name: constants_1.roleSA });
        }
        if (modules) {
            if (findRoleIfExist.name === constants_1.roleSA &&
                !this.findModuleSA(modules, constants_1.moduleSA)) {
                modules.push({ name: constants_1.moduleSA });
            }
            else {
                if (findRoleIfExist.name === constants_1.roleSA &&
                    this.findModuleSA(modules, constants_1.moduleSA)) {
                }
                else {
                    newModules = modules.filter((module) => module.name !== constants_1.moduleSA);
                }
            }
            getIdsModules = await this.moduleService.findIdsByNameModules(newModules || modules);
        }
        else {
            getIdsModules = await this.moduleService.findIdsByNameModules(findRoleIfExist.modules);
        }
        try {
            updateRole = await this.roleModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, roleInput), { modules: getIdsModules }), {
                new: true,
            })
                .populate([
                {
                    path: 'modules',
                    populate: {
                        path: 'menus',
                    },
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en RoleService.updateRole ${e}`);
        }
        return updateRole;
    }
    async deleteRoleById(id) {
        await this.findOneRoleById(id);
        try {
            await this.roleModel.findByIdAndDelete(id);
            return true;
        }
        catch (e) {
            throw new Error(`Error en RoleService.deleteRoleById ${e}`);
        }
    }
    async findAllRoles() {
        let findRoles;
        try {
            findRoles = await this.roleModel.find().populate([
                {
                    path: 'modules',
                    populate: {
                        path: 'menus',
                    },
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en RoleService.findAllRoles ${e}`);
        }
        return findRoles;
    }
    async findOneRoleById(id) {
        let role;
        try {
            role = await this.roleModel.findById(id).populate([
                {
                    path: 'modules',
                    populate: {
                        path: 'menus',
                    },
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en RoleService.findOneRoleById ${e}`);
        }
        if (!role)
            throw new common_1.NotFoundException({
                path: 'role',
                message: [`El rol no se encuentra o no existe`],
            });
        return role;
    }
    async findOneRoleByName(name, param) {
        let role;
        try {
            role = await this.roleModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en RoleService.findOneRoleByName ${e}`);
        }
        switch (param) {
            case 'exist':
                if (role)
                    throw new common_1.BadRequestException({
                        path: 'role',
                        message: [`El rol ${name} ya existe`],
                    });
                break;
            case 'noexist':
                if (!role)
                    throw new common_1.NotFoundException({
                        path: 'role',
                        message: [`El rol no se encuentra o no existe`],
                    });
                return role;
        }
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Role')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        module_service_1.ModuleService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map