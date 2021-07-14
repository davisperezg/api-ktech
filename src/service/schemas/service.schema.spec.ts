import { ServiceSchema } from './service.schema';

describe('ServiceSchema', () => {
  it('should be defined', () => {
    expect(new ServiceSchema()).toBeDefined();
  });
});
