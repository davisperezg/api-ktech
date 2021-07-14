import { BrandSchema } from './brand.schema';

describe('BrandSchema', () => {
  it('should be defined', () => {
    expect(new BrandSchema()).toBeDefined();
  });
});
