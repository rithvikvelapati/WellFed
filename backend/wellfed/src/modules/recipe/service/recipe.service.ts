import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../entity/recipe.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  // Find all recipes
  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  // Find a recipe by ID
  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!recipe) {
      throw new HttpException('Recipe not found', 404);
    }
    return recipe;
  }

  // Create a new recipe
  async create(recipeData: Partial<Recipe>): Promise<Recipe> {
    recipeData.createdAt = new Date();
    recipeData.updatedAt = new Date();
    const recipe = this.recipeRepository.create(recipeData);
    return this.recipeRepository.save(recipe);
  }

  async updateAll(recipeData: Partial<Recipe>): Promise<boolean> {
    const updateResult = await this.recipeRepository.update(
      { recipeId: recipeData.recipeId },
      recipeData,
    );

    return true
  }

  // Update an existing recipe
  async update(id: string, recipeData: Partial<Recipe>): Promise<Recipe> {
    recipeData.updatedAt = new Date();
    const updateResult = await this.recipeRepository.update(
      { _id: new ObjectId(id) },
      recipeData,
    );
    if (updateResult.affected === 0) {
      throw new HttpException('Recipe not found', 404);
    }
    return this.findOne(id);
  }

  // Remove a recipe by ID
  async remove(id: string): Promise<void> {
    const result = await this.recipeRepository.delete({ _id: new ObjectId(id) });
    if (result.affected === 0) {
      throw new HttpException('Recipe not found', 404);
    }
  }
}
