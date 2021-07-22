"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtxUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CtxUser = common_1.createParamDecorator((data, ctx) => {
    return graphql_1.GqlExecutionContext.create(ctx).getContext().req.user;
});
//# sourceMappingURL=ctx-user.decorators.js.map