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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const auth_helper_1 = require("../../lib/helpers/auth.helper");
const role_service_1 = require("../../role/services/role.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../auth/constants");
let UserService = class UserService {
    constructor(userModel, roleService) {
        this.userModel = userModel;
        this.roleService = roleService;
    }
    async onModuleInit() {
        try {
            await this.userModel.updateMany({ status: null }, { status: 1 });
        }
        catch (e) {
            throw new Error(`Error en UserService.onModuleInit ${e}`);
        }
    }
    async createUser(userInput, user) {
        const { email, role } = userInput;
        if (user.role.name !== constants_1.roleSA && role.name === constants_1.roleSA) {
            throw new common_1.UnauthorizedException({
                path: 'forbidden',
                message: ['Lo siento, no tiene permiso para hacer esto'],
            });
        }
        await this.findOneUserByEmail(email, 'exist');
        const password = await auth_helper_1.AuthHelper.hashPassword(userInput.password);
        const confirmPassword = await auth_helper_1.AuthHelper.hashPassword(userInput.confirmPassword);
        const findRole = await this.roleService.findOneRoleByName(userInput.role.name, 'noexist');
        const newUser = new this.userModel(Object.assign(Object.assign({}, userInput), { role: findRole._id, password,
            confirmPassword, status: 1 }));
        let userSaved;
        let foundUser;
        try {
            userSaved = await newUser.save();
        }
        catch (e) {
            throw new Error(`Error en UserService.createUser ${e}`);
        }
        try {
            foundUser = await userSaved
                .populate([
                {
                    path: 'role',
                    populate: {
                        path: 'modules',
                        populate: [
                            {
                                path: 'menus',
                            },
                            { path: 'access' },
                        ],
                    },
                },
            ])
                .execPopulate();
        }
        catch (e) {
            throw new Error(`Error en UserService.createUser.list ${e}`);
        }
        return foundUser;
    }
    async activarUser(id) {
        let findUser;
        await this.findOneUserById(id);
        try {
            findUser = await this.userModel.findByIdAndUpdate(id, { status: 1 }, { new: true });
        }
        catch (e) {
            throw new Error(`Error en UserService.activarUser ${e}`);
        }
        return findUser;
    }
    async desactivateUser(id) {
        let findUser;
        const foundUser = await this.findOneUserById(id);
        if (foundUser.role.name === constants_1.roleSA) {
            throw new common_1.UnauthorizedException({
                path: 'forbidden',
                message: ['Recurso prohibido.'],
            });
        }
        try {
            findUser = await this.userModel.findByIdAndUpdate(id, { status: 2 }, { new: true });
        }
        catch (e) {
            throw new Error(`Error en UserService.desactivateUser ${e}`);
        }
        return findUser;
    }
    async updateUser(userInput, user) {
        const { id, password, confirmPassword, role, email } = userInput;
        if (user.role.name !== constants_1.roleSA && role.name === constants_1.roleSA) {
            throw new common_1.UnauthorizedException({
                path: 'forbidden',
                message: ['Lo siento, no tiene permiso para hacer esto.'],
            });
        }
        let findRole;
        let updateUser;
        const findUserById = await this.findOneUserById(id);
        if (user.role.name === constants_1.roleSA &&
            findUserById.role.name === constants_1.roleSA &&
            role.name !== constants_1.roleSA) {
            throw new common_1.BadRequestException({
                path: 'role',
                message: [
                    `Lo siento, pero el rol "${findUserById.role.name}" ya está establecido.`,
                ],
            });
        }
        if (email && email !== findUserById.email) {
            throw new common_1.BadRequestException({
                path: 'email',
                message: ['Mala idea, esta opción está deshabilitada.'],
            });
        }
        if (password || confirmPassword)
            throw new common_1.BadRequestException(`Ingrese su contraseña correctamente`);
        if (role) {
            findRole = await this.roleService.findOneRoleByName(role.name, 'noexist');
        }
        else {
            findRole = await this.roleService.findOneRoleByName(findUserById.role.name, 'noexist');
        }
        try {
            updateUser = await this.userModel
                .findByIdAndUpdate(id, Object.assign(Object.assign({}, userInput), { role: findRole._id }), {
                new: true,
            })
                .populate([
                {
                    path: 'role',
                    populate: {
                        path: 'modules',
                        populate: [
                            {
                                path: 'menus',
                            },
                            { path: 'access' },
                        ],
                    },
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en UserService.updateUser ${e}`);
        }
        return updateUser;
    }
    async deleteUserById(id) {
        await this.findOneUserById(id);
        try {
            await this.userModel.findByIdAndDelete(id);
            return true;
        }
        catch (e) {
            throw new Error(`Error en UserService.deleteUserById ${e}`);
        }
    }
    async findAllUsers() {
        let findUsers;
        try {
            findUsers = await this.userModel.find().populate([
                {
                    path: 'role',
                    populate: {
                        path: 'modules',
                        populate: [{ path: 'menus' }, { path: 'access' }],
                    },
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en UserService.findAllUsers ${e}`);
        }
        return findUsers;
    }
    async findOneUserById(id) {
        let user;
        try {
            user = await this.userModel.findById(id).populate([
                {
                    path: 'role',
                    populate: {
                        path: 'modules',
                        populate: [
                            {
                                path: 'menus',
                            },
                            { path: 'access' },
                        ],
                    },
                },
            ]);
        }
        catch (e) {
            throw new Error(`Error en UserService.findOneUserById ${e}`);
        }
        if (!user)
            throw new common_1.NotFoundException(`El usuario no se encuentra o no existe`);
        return user;
    }
    async findOneUserByEmail(email, param) {
        let user;
        try {
            user = await this.userModel.findOne({
                email,
            });
        }
        catch (e) {
            throw new Error(`Error en UserService.findOneUserByEmail ${e}`);
        }
        switch (param) {
            case 'exist':
                if (user)
                    throw new common_1.BadRequestException({
                        path: 'email',
                        message: [`El correo ${email} ya existe.`],
                    });
                break;
            case 'noexist':
                if (!user)
                    throw new common_1.BadRequestException({
                        path: 'username',
                        message: ['El usuario no existe'],
                    });
                break;
        }
        return user;
    }
    async findOneUserByIdAndUpdate(id, model) {
        try {
            await this.userModel.findByIdAndUpdate(id, model, { new: true });
        }
        catch (e) {
            throw new Error(`Error en UserService.findOneUserByIdAndUpdate`);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        role_service_1.RoleService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map