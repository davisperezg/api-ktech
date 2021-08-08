import { access1, access2, access3, access4, token } from 'src/config/config';

export const jwtConstants = {
  secret: token,
};

export const roleSA = 'SuperAdmin';
export const menuSA = 'Modulos';
export const moduleSA = 'Administración de modulos';

export const dataAccess = [
  { name: access1 },
  { name: access2 },
  { name: access3 },
  { name: access4 },
];
