"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataAccess = exports.moduleSA = exports.menuSA = exports.roleSA = exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.TOKEN || 'TOKEN_DEV',
};
exports.roleSA = 'SuperAdmin';
exports.menuSA = 'Modulos';
exports.moduleSA = 'Administración de modulos';
exports.dataAccess = [
    { name: 'Editar' },
    { name: 'Eliminar' },
    { name: 'Crear' },
    { name: 'Ver' },
];
//# sourceMappingURL=constants.js.map