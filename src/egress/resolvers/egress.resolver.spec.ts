import { Test, TestingModule } from '@nestjs/testing';
import { EgressResolver } from './egress.resolver';

describe('EgressResolver', () => {
  let resolver: EgressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EgressResolver],
    }).compile();

    resolver = module.get<EgressResolver>(EgressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
