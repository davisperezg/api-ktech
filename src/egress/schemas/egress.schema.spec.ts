import { EgressSchema } from './egress.schema';

describe('EgressSchema', () => {
  it('should be defined', () => {
    expect(new EgressSchema()).toBeDefined();
  });
});
