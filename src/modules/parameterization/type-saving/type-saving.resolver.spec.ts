import { Test, TestingModule } from '@nestjs/testing';
import { TypeSavingResolver } from './type-saving.resolver';

describe('TypeSavingResolver', () => {
  let resolver: TypeSavingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeSavingResolver],
    }).compile();

    resolver = module.get<TypeSavingResolver>(TypeSavingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
