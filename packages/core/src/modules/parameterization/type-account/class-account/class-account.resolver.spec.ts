import { Test, TestingModule } from '@nestjs/testing';
import { ClassAccountResolver } from './class-account.resolver';

describe('ClassAccountResolver', () => {
  let resolver: ClassAccountResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassAccountResolver],
    }).compile();

    resolver = module.get<ClassAccountResolver>(ClassAccountResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
