import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

export const url_mongo = process.env.URL_MONGO || 'mongodb://localhost';
export const token = process.env.TOKEN || 'DEV';

export const exist = process.env.EXIST || 'SEENCUENTRA';
export const no_exist = process.env.NOEXIST || 'SINOSEENCUENTRA';
export const nul = process.env.NULL || 'NOHAY';

export const access1 = process.env.ACCESS1 || 'ACCESO1';
export const access2 = process.env.ACCESS2 || 'ACCESO2';
export const access3 = process.env.ACCESS3 || 'ACCESO3';
export const access4 = process.env.ACCESS4 || 'ACCESO4';
