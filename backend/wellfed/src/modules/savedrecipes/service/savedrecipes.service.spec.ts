import { Test, TestingModule } from '@nestjs/testing';
import { SavedrecipesService } from './savedrecipes.service';

describe('SavedrecipesService', () => {
  let service: SavedrecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedrecipesService],
    }).compile();

    service = module.get<SavedrecipesService>(SavedrecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
