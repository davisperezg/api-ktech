import { Customer } from './customer.schema';

describe('Customer', () => {
  it('should be defined', () => {
    expect(new Customer()).toBeDefined();
  });
});
