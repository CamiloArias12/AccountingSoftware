import { Test, TestingModule } from '@nestjs/testing';
import { TypeCreditResolver } from './type-credit.resolver';

describe('TypeCreditResolver', () => {
  let resolver: TypeCreditResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeCreditResolver],
    }).compile();

    resolver = module.get<TypeCreditResolver>(TypeCreditResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
