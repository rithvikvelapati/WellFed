import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InstructionService } from '../service/instruction.service';
import { Instruction } from '../entity/instruction.entity';

@Controller('instruction')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  // GET all instructions
  @Get()
  findAll(): Promise<Instruction[]> {
    return this.instructionService.findAll();
  }

  // GET a single instruction by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Instruction> {
    return this.instructionService.findOne(id);
  }

  @Get('recipe/:recipeId')
  findByRecipeId(@Param('recipeId') recipeId: string): Promise<Instruction[]> {
    return this.instructionService.findByRecipeId(recipeId);
  }

  // POST create a new instruction
  @Post()
  create(@Body() instructionData: Partial<Instruction>): Promise<Instruction> {
    return this.instructionService.create(instructionData);
  }

  // PUT update an instruction
  @Put(':id')
  update(@Param('id') id: string, @Body() instructionData: Partial<Instruction>): Promise<Instruction> {
    return this.instructionService.update(id, instructionData);
  }

  // DELETE an instruction
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.instructionService.remove(id);
  }
}
