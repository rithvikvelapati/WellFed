import { Test, TestingModule } from '@nestjs/testing';
import { SavedRecipesController} from './savedrecipes.controller';

describe('SavedrecipesController', () => {
  let controller: SavedRecipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedRecipesController],
    }).compile();

    controller = module.get<SavedRecipesController>(SavedRecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
