import { Test, TestingModule } from '@nestjs/testing';
import { TownResolver } from './town.resolver';

describe('TownResolver', () => {
  let resolver: TownResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TownResolver],
    }).compile();

    resolver = module.get<TownResolver>(TownResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
