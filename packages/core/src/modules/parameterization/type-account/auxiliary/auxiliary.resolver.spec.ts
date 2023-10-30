import { Test, TestingModule } from '@nestjs/testing';
import { AuxiliaryResolver } from './auxiliary.resolver';

describe('AuxiliaryResolver', () => {
  let resolver: AuxiliaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuxiliaryResolver],
    }).compile();

    resolver = module.get<AuxiliaryResolver>(AuxiliaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
