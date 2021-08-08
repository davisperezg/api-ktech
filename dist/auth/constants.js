"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataAccess = exports.moduleSA = exports.menuSA = exports.roleSA = exports.jwtConstants = void 0;
const config_1 = require("../config/config");
exports.jwtConstants = {
    secret: config_1.token,
};
exports.roleSA = 'SuperAdmin';
exports.menuSA = 'Modulos';
exports.moduleSA = 'Administración de modulos';
exports.dataAccess = [
    { name: config_1.access1 },
    { name: config_1.access2 },
    { name: config_1.access3 },
    { name: config_1.access4 },
];
//# sourceMappingURL=constants.js.map