import { Device } from './device.schema';

describe('Device', () => {
  it('should be defined', () => {
    expect(new Device()).toBeDefined();
  });
});
