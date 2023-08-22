import { Test, TestingModule } from '@nestjs/testing';
import { TypeSavingService } from './type-saving.service';

describe('TypeSavingService', () => {
  let service: TypeSavingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeSavingService],
    }).compile();

    service = module.get<TypeSavingService>(TypeSavingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
