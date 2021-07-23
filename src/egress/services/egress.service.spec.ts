import { Test, TestingModule } from '@nestjs/testing';
import { EgressService } from './egress.service';

describe('EgressService', () => {
  let service: EgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EgressService],
    }).compile();

    service = module.get<EgressService>(EgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
