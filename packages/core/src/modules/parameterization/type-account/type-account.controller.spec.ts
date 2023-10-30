import { Test, TestingModule } from '@nestjs/testing';
import { TypeAccountController } from './type-account.controller';

describe('TypeAccountController', () => {
  let controller: TypeAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeAccountController],
    }).compile();

    controller = module.get<TypeAccountController>(TypeAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
