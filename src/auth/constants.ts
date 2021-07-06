export const jwtConstants = {
  secret: process.env.TOKEN || 'TOKEN_DEV',
};

export const roleSA = 'SuperAdmin';
export const menuSA = 'Modulos';
export const moduleSA = 'Administración de modulos';

export const dataAccess = [
  { name: 'Editar' },
  { name: 'Eliminar' },
  { name: 'Crear' },
  { name: 'Ver' },
];
