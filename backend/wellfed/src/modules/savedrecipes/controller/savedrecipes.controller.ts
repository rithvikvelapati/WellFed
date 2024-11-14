import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { SavedRecipesService } from '../service/savedrecipes.service';
import { SavedRecipes } from '../entity/savedrecipes.entity';

@Controller('savedrecipes')
export class SavedRecipesController {
  constructor(private readonly savedRecipesService: SavedRecipesService) {}

  // Get all saved recipes
  @Get()
  findAll(): Promise<SavedRecipes[]> {
    return this.savedRecipesService.findAll();
  }

  // Get a single saved recipe by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<SavedRecipes> {
    return this.savedRecipesService.findOne(id);
  }

  // Create a new saved recipe
  @Post()
  create(@Body() savedRecipeData: Partial<SavedRecipes>): Promise<SavedRecipes> {
    return this.savedRecipesService.create(savedRecipeData);
  }

  // Update a saved recipe by ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() savedRecipeData: Partial<SavedRecipes>,
  ): Promise<SavedRecipes> {
    return this.savedRecipesService.update(id, savedRecipeData);
  }

  // Delete a saved recipe by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.savedRecipesService.remove(id);
  }
}
