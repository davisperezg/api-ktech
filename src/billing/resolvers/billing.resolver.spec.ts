import { Test, TestingModule } from '@nestjs/testing';
import { BillingResolver } from './billing.resolver';

describe('BillingResolver', () => {
  let resolver: BillingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingResolver],
    }).compile();

    resolver = module.get<BillingResolver>(BillingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
