import { Vehicle } from './vehicle.schema';

describe('Vehicle', () => {
  it('should be defined', () => {
    expect(new Vehicle()).toBeDefined();
  });
});
