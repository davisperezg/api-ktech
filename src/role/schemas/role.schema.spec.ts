import { Role } from './role.schema';

describe('RoleEntity', () => {
  it('should be defined', () => {
    expect(new Role()).toBeDefined();
  });
});
