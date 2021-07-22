"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelper = void 0;
const bcrypt = require("bcrypt");
class AuthHelper {
    static comparePassword(password, passwordHashed) {
        return bcrypt.compare(password, passwordHashed);
    }
    static hashPassword(password) {
        const saltOrRounds = 12;
        return bcrypt.hash(password, saltOrRounds);
    }
}
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=auth.helper.js.map