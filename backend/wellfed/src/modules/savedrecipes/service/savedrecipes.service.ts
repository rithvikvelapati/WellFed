import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedRecipes } from '../entity/savedrecipes.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class SavedRecipesService {
  constructor(
    @InjectRepository(SavedRecipes)
    private readonly savedRecipesRepository: Repository<SavedRecipes>,
  ) {}

  // Find all saved recipes
  findAll(id): Promise<SavedRecipes[]> {
    return this.savedRecipesRepository.find({ where: { userId: id } });
  }

  // Find a saved recipe by ID
  async findOne(id: string): Promise<SavedRecipes> {
    const savedRecipe = await this.savedRecipesRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!savedRecipe) {
      throw new HttpException('Saved recipe not found', 404);
    }
    return savedRecipe;
  }

  // Create a new saved recipe
  async create(savedRecipeData: Partial<SavedRecipes>): Promise<SavedRecipes> {
    savedRecipeData.createdAt = new Date();
    savedRecipeData.updatedAt = new Date();
    const savedRecipe = this.savedRecipesRepository.create(savedRecipeData);
    return this.savedRecipesRepository.save(savedRecipe);
  }

  // Update an existing saved recipe
  async update(id: string, savedRecipeData: Partial<SavedRecipes>): Promise<SavedRecipes> {
    savedRecipeData.updatedAt = new Date();
    await this.savedRecipesRepository.update(new ObjectId(id), savedRecipeData);
    return this.findOne(id);
  }

    // Update an existing saved recipe
    async updateFav(id: string, savedRecipeData: Partial<SavedRecipes>): Promise<Boolean> {
          savedRecipeData.updatedAt = new Date();
      const isPresent = await this.savedRecipesRepository.findOneBy({
       recipeId: id,
      });

      if(isPresent) {
        await this.savedRecipesRepository.delete({recipeId: id});
      } else {
        savedRecipeData.updatedAt = new Date();
        savedRecipeData.createdAt = new Date();
        savedRecipeData.updatedBy = savedRecipeData?.userId;
        savedRecipeData.createdBy = savedRecipeData?.userId;
        await this.savedRecipesRepository.save(savedRecipeData);
      }
    
      return true;
    }

  

  // Remove a saved recipe by ID
  async remove(id: string): Promise<void> {
    const result = await this.savedRecipesRepository.delete(new ObjectId(id));
    if (result.affected === 0) {
      throw new HttpException('Saved recipe not found', 404);
    }
  }
}
