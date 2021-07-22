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
exports.ModuleService = void 0;
const menu_service_1 = require("./../../menu/services/menu.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const access_service_1 = require("../../access/services/access.service");
const role_schema_1 = require("../../role/schemas/role.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
const auth_helper_1 = require("../../lib/helpers/auth.helper");
const constants_1 = require("../../auth/constants");
let ModuleService = class ModuleService {
    constructor(moduleModel, roleModel, userModel, accessService, menuService) {
        this.moduleModel = moduleModel;
        this.roleModel = roleModel;
        this.userModel = userModel;
        this.accessService = accessService;
        this.menuService = menuService;
        this.findMenuSA = (items, value) => items.some((item) => item.name === value);
        this.findAccessSA = (items, value) => value.map((val) => !!items.find((item) => item.name === val.name));
    }
    async onApplicationBootstrap() {
        let countModule;
        let valuesModule;
        let findRole;
        try {
            countModule = await this.moduleModel.estimatedDocumentCount();
        }
        catch (e) {
            throw new Error(`Error en ModuleService.onApplicationBootstrap.Count ${e}`);
        }
        if (countModule > 0)
            return;
        const dataModules = [
            {
                name: 'Administración de modulos',
            },
        ];
        const dataAccess = [
            {
                name: 'Crear',
            },
            {
                name: 'Editar',
            },
            {
                name: 'Eliminar',
            },
            {
                name: 'Ver',
            },
        ];
        const dataMenus = [
            { name: 'Roles' },
            { name: 'Usuarios' },
            { name: 'Modulos' },
        ];
        const dataRol = {
            name: 'SuperAdmin',
            description: 'El SuperAdmin administra RPUM',
            modules: dataModules,
        };
        try {
            const getIdsMenus = await this.menuService.findIdsByNameMenu(dataMenus);
            const getIdsAccess = await this.accessService.findIdsByNameAccess(dataAccess);
            valuesModule = await Promise.all([
                new this.moduleModel({
                    name: 'Administración de modulos',
                    access: getIdsAccess,
                    menus: getIdsMenus,
                }).save(),
            ]);
            const getIdModules = await this.findIdsByNameModules(dataModules);
            const newRole = new this.roleModel(Object.assign(Object.assign({}, dataRol), { modules: getIdModules }));
            try {
                await newRole.save();
            }
            catch (e) {
                throw new Error(`Error en ModuleService.onApplicationBootstrap.SaveRol ${e}`);
            }
            try {
                findRole = await this.roleModel.findOne({ name: dataRol.name });
            }
            catch (e) {
                throw new Error(`Error en ModuleService.onApplicationBootstrap.findOneRole ${e}`);
            }
            const password = await auth_helper_1.AuthHelper.hashPassword('D@peor2021');
            const confirmPassword = await auth_helper_1.AuthHelper.hashPassword('D@peor2021');
            const newUser = new this.userModel({
                name: 'Keiner',
                lastName: 'Perez Guzman',
                email: 'davisperezg@gmail.com',
                password,
                confirmPassword,
                role: findRole._id,
                status: 1,
            });
            try {
                await newUser.save();
            }
            catch (e) {
                throw new Error(`Error en ModuleService.onApplicationBootstrap.SaveUser ${e}`);
            }
        }
        catch (e) {
            throw new Error(`Error en ModuleService.onApplicationBootstrap.SaveModule ${e}`);
        }
        return valuesModule;
    }
    async createModule(moduleInput) {
        const { name, menus, access } = moduleInput;
        let module;
        let foundModule;
        if (this.findMenuSA(menus, constants_1.menuSA)) {
            throw new common_1.NotFoundException({
                path: 'module',
                message: [`Lo siento, no puedes agregar el modulo "Modulos".`],
            });
        }
        await this.findOneModuleByName(name, 'exist');
        const getIdsMenus = await this.menuService.findIdsByNameMenu(menus);
        const getIdsAccess = await this.accessService.findIdsByNameAccess(access);
        const newModule = new this.moduleModel(Object.assign(Object.assign({}, moduleInput), { menus: getIdsMenus, access: getIdsAccess }));
        try {
            module = await newModule.save();
        }
        catch (e) {
            throw new Error(`Error en ModuleService.createModule ${e}`);
        }
        try {
            foundModule = await module
                .populate([{ path: 'menus' }, { path: 'access' }])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en ModuleService.createModule.populate ${e}`);
        }
        return foundModule;
    }
    async updateModule(moduleInput) {
        const { id, menus, access, name } = moduleInput;
        let getIdsAccess;
        let getIdsMenus;
        let updateModule;
        let newMenus;
        let newAccess;
        const findModule = await this.findOneModuleById(id);
        if (access && findModule.name === constants_1.moduleSA) {
            this.findAccessSA(access, constants_1.dataAccess).map((search) => {
                if (search === false) {
                    moduleInput = Object.assign(Object.assign({}, moduleInput), { access: [] });
                    access.push({ name: 'Editar' }, { name: 'Eliminar' }, { name: 'Crear' }, { name: 'Ver' });
                }
            });
        }
        if (name && findModule.name === constants_1.moduleSA) {
            moduleInput = Object.assign(Object.assign({}, moduleInput), { name: constants_1.moduleSA });
        }
        const findModuleIfExist = await this.findOneModuleById(id);
        if (access) {
            getIdsAccess = await this.accessService.findIdsByNameAccess(newAccess || access);
        }
        else {
            getIdsAccess = await this.accessService.findIdsByNameAccess(findModuleIfExist.access);
        }
        if (menus) {
            if (findModule.name === constants_1.moduleSA && !this.findMenuSA(menus, constants_1.menuSA)) {
                menus.push({ name: constants_1.menuSA });
            }
            else {
                if (findModule.name === constants_1.moduleSA && this.findMenuSA(menus, constants_1.menuSA)) {
                }
                else {
                    newMenus = menus.filter((menu) => menu.name !== constants_1.menuSA);
                }
            }
            getIdsMenus = await this.menuService.findIdsByNameMenu(newMenus || menus);
        }
        else {
            getIdsMenus = await this.menuService.findIdsByNameMenu(findModuleIfExist.menus);
        }
        try {
            updateModule = await this.moduleModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, moduleInput), { menus: getIdsMenus, access: getIdsAccess }), {
                new: true,
            })
                .populate([{ path: 'menus' }, { path: 'access' }]);
        }
        catch (e) {
            throw new Error(`Error en ModuleService.updateModule ${e}`);
        }
        return updateModule;
    }
    async deleteModule(id) {
        await this.findOneModuleById(id);
        try {
            await this.moduleModel.findByIdAndDelete(id);
            return true;
        }
        catch (e) {
            throw new Error(`Error en ModuleService.deleteModule ${e}`);
        }
    }
    async findAllModules() {
        let findModules;
        try {
            findModules = await this.moduleModel
                .find()
                .populate([{ path: 'menus' }, { path: 'access' }]);
        }
        catch (e) {
            throw new Error(`Error en ModuleService.findAllModules ${e}`);
        }
        return findModules;
    }
    async findOneModuleById(id) {
        let module;
        try {
            module = await this.moduleModel
                .findById(id)
                .populate([{ path: 'menus' }, { path: 'access' }]);
        }
        catch (e) {
            throw new Error(`Error en ModuleService.findOneModuleById ${e}`);
        }
        if (!module)
            throw new common_1.NotFoundException({
                path: 'module',
                message: [`El modulo no se encuentra o no existe`],
            });
        return module;
    }
    async findOneModuleByName(name, param) {
        let module;
        try {
            module = await this.moduleModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en ModuleService.findOneRoleByName ${e}`);
        }
        switch (param) {
            case 'exist':
                if (module)
                    throw new common_1.BadRequestException({
                        path: 'module',
                        message: [`El modulo ${name} ya existe`],
                    });
                break;
            case 'noexist':
                if (!module)
                    throw new common_1.NotFoundException({
                        path: 'module',
                        message: [`El modulo no se encuentra o no existe`],
                    });
                return module;
        }
    }
    async findIdsByNameModules(modules) {
        const getNameModule = modules.map((module) => module.name);
        const findModulesByName = await this.findModulesByNames(getNameModule);
        const getIdModules = findModulesByName.map((module) => module._id);
        return getIdModules;
    }
    async findModulesByNames(param) {
        let modules;
        try {
            modules = await this.moduleModel.find({ name: { $in: param } });
        }
        catch (e) {
            throw new Error(`Error en ModuleService.findModulesByNames ${e}`);
        }
        if (!modules || modules.length === 0)
            throw new common_1.NotFoundException({
                path: 'module',
                message: [`El modulo no se encuentra o no existe`],
            });
        return modules;
    }
};
ModuleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Module')),
    __param(1, mongoose_2.InjectModel('Role')),
    __param(2, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        access_service_1.AccessService,
        menu_service_1.MenuService])
], ModuleService);
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map