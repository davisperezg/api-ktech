import { Billing } from './billing.schema';

describe('Billing', () => {
  it('should be defined', () => {
    expect(new Billing()).toBeDefined();
  });
});
