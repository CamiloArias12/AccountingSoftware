import { Test, TestingModule } from '@nestjs/testing';
import { ClassAccountService } from './class-account.service';

describe('ClassAccountService', () => {
  let service: ClassAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassAccountService],
    }).compile();

    service = module.get<ClassAccountService>(ClassAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
