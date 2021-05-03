import { MenuSchema } from './menu.schema';

describe('MenuSchema', () => {
  it('should be defined', () => {
    expect(new MenuSchema()).toBeDefined();
  });
});
