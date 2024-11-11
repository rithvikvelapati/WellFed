import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { ToolService } from '../service/tool.service';
import { Tool } from '../entity/tool.entity';

@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  // Get all tools
  @Get()
  findAll(): Promise<Tool[]> {
    return this.toolService.findAll();
  }

  @Get('recipe/:recipeId')
  async findByRecipe(@Param('recipeId') recipeId: string): Promise<Tool[]> {
    return this.toolService.findByRecipeId(recipeId);
  }

  // Get a single tool by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tool> {
    return this.toolService.findOne(id);
  }

  // Create a new tool
  @Post()
  create(@Body() toolData: Partial<Tool>): Promise<Tool> {
    return this.toolService.create(toolData);
  }

  // Update a tool by ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() toolData: Partial<Tool>,
  ): Promise<Tool> {
    return this.toolService.update(id, toolData);
  }

  // Delete a tool by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.toolService.remove(id);
  }
}
