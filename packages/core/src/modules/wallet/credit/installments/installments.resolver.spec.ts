import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentsResolver } from './installments.resolver';
import { InstallmentsService } from './installments.service';

describe('InstallmentsResolver', () => {
  let resolver: InstallmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallmentsResolver, InstallmentsService],
    }).compile();

    resolver = module.get<InstallmentsResolver>(InstallmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
