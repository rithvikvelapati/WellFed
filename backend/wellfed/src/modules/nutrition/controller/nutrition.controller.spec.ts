import { Test, TestingModule } from '@nestjs/testing';
import { NutritionController } from './nutrition.controller';

describe('NutritionController', () => {
  let controller: NutritionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutritionController],
    }).compile();

    controller = module.get<NutritionController>(NutritionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
