"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
let message = '';
let GqlAuthGuard = class GqlAuthGuard extends passport_1.AuthGuard('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            switch (info.message) {
                case 'jwt expired':
                    message = 'La sessión ha expirado. Vuelve a loguearte.';
                    break;
                case 'invalid signature':
                    message = 'Modificado. El token es invalido.';
                    break;
                case 'jwt malformed':
                    message = 'Modificado. El token no tiene el formato correcto.';
                    break;
            }
            throw new common_1.UnauthorizedException({
                path: 'forbidden',
                message: [`${message}`],
            });
        }
        return user;
    }
};
GqlAuthGuard = __decorate([
    common_1.Injectable()
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
//# sourceMappingURL=gql-auth.guard.js.map