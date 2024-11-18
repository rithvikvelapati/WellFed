import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nutrition } from '../entity/nutrition.entity';
import { ObjectId } from 'mongodb';
import { Recipe } from 'src/modules/recipe/entity/recipe.entity';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Nutrition)
    private readonly nutritionRepository: Repository<Nutrition>,
  ) { }

  // Find all nutrition records
  findAll(): Promise<Nutrition[]> {
    return this.nutritionRepository.find();
  }

  // Find nutritions by recipeId
  async findNutritionByRecipeId(recipeId: string): Promise<Nutrition | null> {
    return await this.nutritionRepository.findOne({ where: { recipeId } });
  }

  // Find a nutrition record by ID
  async findOne(id: string): Promise<Nutrition> {
    const nutrition = await this.nutritionRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!nutrition) {
      throw new HttpException('Nutrition record not found', 404);
    }
    return nutrition;
  }

  // Create a new nutrition record
  async create(nutritionData: Partial<Nutrition>): Promise<Nutrition> {
    nutritionData.createdAt = new Date();
    nutritionData.updatedAt = new Date();
    const nutrition = this.nutritionRepository.create(nutritionData);
    return this.nutritionRepository.save(nutrition);
  }

  // Update an existing nutrition record
  async update(id: string, nutritionData: Partial<Nutrition>): Promise<Nutrition> {
    nutritionData.updatedAt = new Date();
    const updateResult = await this.nutritionRepository.update({ _id: new ObjectId(id) }, nutritionData);
    if (updateResult.affected === 0) {
      throw new HttpException('Nutrition record not found', 404);
    }
    return this.findOne(id);
  }

  // Update an existing ingredient
  async updateAll(): Promise<boolean> {

    const ings = await this.nutritionRepository.find();
    for (const ing of ings) {
      
     
      const rec = await this.recipeRepository.findOne({where: {recipeId: parseInt(ing.recipeId)}})
      if(rec) {
        ing.recipeId = rec._id.toString();
        ing.updatedAt = new Date();
        ing.createdAt = new Date();
        ing.createdBy = 'Admin';
        ing.updatedBy = 'Admin';
        await this.nutritionRepository.update({ _id: new ObjectId(ing._id) }, ing);
      }
      
    }
    return true
  }

  // Remove a nutrition record by ID
  async remove(id: string): Promise<void> {
    const result = await this.nutritionRepository.delete({ _id: new ObjectId(id) });
    if (result.affected === 0) {
      throw new HttpException('Nutrition record not found', 404);
    }
  }
}
