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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("../../user/schemas/user.schema");
const auth_helper_1 = require("../../lib/helpers/auth.helper");
const rand_token_1 = require("rand-token");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../user/services/user.service");
const refreshTokens = {};
let AuthService = class AuthService {
    constructor(userService, jwt) {
        this.userService = userService;
        this.jwt = jwt;
    }
    async signIn(authInput) {
        const { email, password } = authInput;
        const refresh_token = rand_token_1.uid(256);
        const findUser = await this.userService.findOneUserByEmail(email, 'noexist');
        const isMatch = await auth_helper_1.AuthHelper.comparePassword(password, findUser.password);
        if (!isMatch)
            throw new common_1.BadRequestException({
                path: 'password',
                message: 'Contraseña inválida',
            });
        if (findUser.status !== 1) {
            throw new common_1.UnauthorizedException({
                path: 'forbidden',
                message: ['Acceso denegado.'],
            });
        }
        refreshTokens[refresh_token] = email;
        return { access_token: this.getToken(findUser._id), refresh_token };
    }
    async changePasswordToUser(userPassword) {
        let result = false;
        let isMatch;
        const { id, currentPassword, newPassword, confirmNewPassword, } = userPassword;
        try {
            isMatch = await this.getMatchPasswordById(id, currentPassword);
        }
        catch (e) {
            throw new Error(`Error en AuthService.changePassword ${e}`);
        }
        if (!isMatch)
            return result;
        try {
            const password = await auth_helper_1.AuthHelper.hashPassword(newPassword);
            const confirmPassword = await auth_helper_1.AuthHelper.hashPassword(confirmNewPassword);
            await this.userService.findOneUserByIdAndUpdate(id, {
                password,
                confirmPassword,
            });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en AuthService.changePasswordToUser ${e}`);
        }
        return result;
    }
    async changePasswordToAdmin(userPassword) {
        let result;
        const { id, newPassword, confirmNewPassword } = userPassword;
        try {
            const password = await auth_helper_1.AuthHelper.hashPassword(newPassword);
            const confirmPassword = await auth_helper_1.AuthHelper.hashPassword(confirmNewPassword);
            await this.userService.findOneUserByIdAndUpdate(id, {
                password,
                confirmPassword,
            });
            result = true;
        }
        catch (e) {
            throw new Error(`Error en AuthService.changePasswordToAdmin ${e}`);
        }
        return result;
    }
    async getTokenWithRefresh(authRefreshTokenInput) {
        const email = authRefreshTokenInput.email;
        const refreshToken = authRefreshTokenInput.refresh_token;
        const findUser = await this.userService.findOneUserByEmail(email, 'noexist');
        if (refreshToken in refreshTokens &&
            refreshTokens[refreshToken] === email) {
            return { access_token: this.getToken(findUser._id) };
        }
        else {
            throw new common_1.UnauthorizedException({
                path: 'token',
                message: ['El token no funciona, por favor volver a loguearte'],
            });
        }
    }
    async validateUser(id) {
        return await this.userService.findOneUserById(id);
    }
    async getMatchPasswordById(id, myPassword) {
        let isMatch;
        const findUser = await this.userService.findOneUserById(id);
        try {
            isMatch = await auth_helper_1.AuthHelper.comparePassword(myPassword, findUser.password);
        }
        catch (e) {
            throw new Error(`Error en AuthService.getMatchPasswordById.comparePassword ${e}`);
        }
        return isMatch;
    }
    getToken(id) {
        const payload = { userId: id };
        return this.jwt.sign(payload);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map