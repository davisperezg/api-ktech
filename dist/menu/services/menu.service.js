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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MenuService = class MenuService {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }
    async onModuleInit() {
        let countMenus;
        let valuesMenus;
        try {
            countMenus = await this.menuModel.estimatedDocumentCount();
        }
        catch (e) {
            throw new Error(`Error en MenuService.onModuleInit.Count ${e}`);
        }
        if (countMenus > 0)
            return;
        try {
            valuesMenus = await Promise.all([
                new this.menuModel({ name: 'Roles', link: 'roles' }).save(),
                new this.menuModel({ name: 'Usuarios', link: 'usuarios' }).save(),
                new this.menuModel({ name: 'Modulos', link: 'modulos' }).save(),
            ]);
        }
        catch (e) {
            throw new Error(`Error en MenuService.onModuleInit.All ${e}`);
        }
        return valuesMenus;
    }
    async createMenu(menuInput) {
        const { name } = menuInput;
        await this.findOneMenuByName(name, 'exist');
        const newMenu = new this.menuModel(menuInput);
        let saveMenu;
        try {
            saveMenu = await newMenu.save();
        }
        catch (e) {
            throw new Error(`Error en RoleService.createRole ${e}`);
        }
        return saveMenu;
    }
    async updateMenu(userInput) {
        await this.findOneMenuById(userInput.id);
        let updateMenu;
        try {
            updateMenu = await this.menuModel.findByIdAndUpdate(userInput.id, userInput, { new: true });
        }
        catch (e) {
            throw new Error(`Error en MenuService.updateMenu ${e}`);
        }
        return updateMenu;
    }
    async findAllMenu() {
        let findMenus;
        try {
            findMenus = await this.menuModel.find();
        }
        catch (e) {
            throw new Error(`Error en MenuService.findAllMenu ${e}`);
        }
        return findMenus;
    }
    async findOneMenuByName(name, param) {
        let menu;
        try {
            menu = await this.menuModel.findOne({ name });
        }
        catch (e) {
            throw new Error(`Error en MenuService.findOneMenuByName ${e}`);
        }
        switch (param) {
            case 'exist':
                if (menu)
                    throw new common_1.BadRequestException({
                        path: 'menu',
                        message: [`El menu ${name} ya existe`],
                    });
                break;
            case 'noexist':
                if (!menu)
                    throw new common_1.NotFoundException({
                        path: 'menu',
                        message: [`El menu no se encuentra o no existe`],
                    });
                return menu;
        }
    }
    async findIdsByNameMenu(menus) {
        const getNameMenu = menus.map((menu) => menu.name);
        const findMenuByName = await this.findMenuByNames(getNameMenu);
        const getIdMenus = findMenuByName.map((menu) => menu._id);
        return getIdMenus;
    }
    async findMenuByNames(param) {
        let menus;
        try {
            menus = await this.menuModel.find({ name: { $in: param } });
        }
        catch (e) {
            throw new Error(`Error en MenuService.findMenuByNames ${e}`);
        }
        if (!menus || menus.length === 0)
            throw new common_1.NotFoundException({
                path: 'menu',
                message: [`El menu no se encuentra o no existe`],
            });
        return menus;
    }
    async findOneMenuById(id) {
        let menu;
        try {
            menu = await this.menuModel.findById(id);
        }
        catch (e) {
            throw new Error(`Error en MenuService.findOneMenuById ${e}`);
        }
        if (!menu)
            throw new common_1.BadRequestException({
                path: 'menu',
                message: [`El menu no se encuentra o no existe`],
            });
        return menu;
    }
};
MenuService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Menu')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map