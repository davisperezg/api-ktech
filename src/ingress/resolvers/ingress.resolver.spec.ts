import { Test, TestingModule } from '@nestjs/testing';
import { IngressResolver } from './ingress.resolver';

describe('IngressResolver', () => {
  let resolver: IngressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngressResolver],
    }).compile();

    resolver = module.get<IngressResolver>(IngressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
