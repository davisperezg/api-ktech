import { Test, TestingModule } from '@nestjs/testing';
import { RenewResolver } from './renew.resolver';

describe('RenewResolver', () => {
  let resolver: RenewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenewResolver],
    }).compile();

    resolver = module.get<RenewResolver>(RenewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
