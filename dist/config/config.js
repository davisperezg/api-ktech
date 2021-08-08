"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.access4 = exports.access3 = exports.access2 = exports.access1 = exports.nul = exports.no_exist = exports.exist = exports.token = exports.url_mongo = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '/.env' });
exports.url_mongo = process.env.URL_MONGO || 'mongodb://localhost';
exports.token = process.env.TOKEN || 'DEV';
exports.exist = process.env.EXIST || 'SEENCUENTRA';
exports.no_exist = process.env.NOEXIST || 'SINOSEENCUENTRA';
exports.nul = process.env.NULL || 'NOHAY';
exports.access1 = process.env.ACCESS1 || 'ACCESO1';
exports.access2 = process.env.ACCESS2 || 'ACCESO2';
exports.access3 = process.env.ACCESS3 || 'ACCESO3';
exports.access4 = process.env.ACCESS4 || 'ACCESO4';
//# sourceMappingURL=config.js.map