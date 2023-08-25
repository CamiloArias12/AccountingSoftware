import { Test, TestingModule } from '@nestjs/testing';
import { TypeCreditService } from './type-credit.service';

describe('TypeCreditService', () => {
  let service: TypeCreditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeCreditService],
    }).compile();

    service = module.get<TypeCreditService>(TypeCreditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
