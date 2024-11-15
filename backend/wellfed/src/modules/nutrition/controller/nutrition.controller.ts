import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { NutritionService } from '../service/nutrition.service';
import { Nutrition } from '../entity/nutrition.entity';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  // Get all nutrition records
  @Get()
  findAll(): Promise<Nutrition[]> {
    return this.nutritionService.findAll();
  }

  @Get('recipe/:recipeId')
  async getNutritionByRecipeId(@Param('recipeId') recipeId: string): Promise<Nutrition | null> {
    return await this.nutritionService.findNutritionByRecipeId(recipeId);
  }

  // Get a single nutrition record by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Nutrition> {
    return this.nutritionService.findOne(id);
  }

  // Create a new nutrition record
  @Post()
  create(@Body() nutritionData: Partial<Nutrition>): Promise<Nutrition> {
    return this.nutritionService.create(nutritionData);
  }

  // Update a nutrition record
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() nutritionData: Partial<Nutrition>,
  ): Promise<Nutrition> {
    return this.nutritionService.update(id, nutritionData);
  }
  
  updateAll(): Promise<boolean> {
    return this.nutritionService.updateAll();
  }

  // Delete a nutrition record by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.nutritionService.remove(id);
  }
}
