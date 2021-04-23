import { User } from './user.schema';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
