import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../entity/recipe.entity';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // Get all recipes
  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  // Get a single recipe by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.findOne(id);
  }

  // Create a new recipe
  @Post()
  create(@Body() recipeData: Partial<Recipe>): Promise<Recipe> {
    return this.recipeService.create(recipeData);
  }

  // Update a recipe by ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() recipeData: Partial<Recipe>,
  ): Promise<Recipe> {
    return this.recipeService.update(id, recipeData);
  }

  // Delete a recipe by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.recipeService.remove(id);
  }
}
