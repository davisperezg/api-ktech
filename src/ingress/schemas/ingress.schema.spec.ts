import { IngressSchema } from './ingress.schema';

describe('IngressSchema', () => {
  it('should be defined', () => {
    expect(new IngressSchema()).toBeDefined();
  });
});
