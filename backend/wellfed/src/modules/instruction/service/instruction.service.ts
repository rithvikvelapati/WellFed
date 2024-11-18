import { ObjectId } from 'mongodb';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instruction } from '../entity/instruction.entity';
import { Recipe } from 'src/modules/recipe/entity/recipe.entity';

@Injectable()
export class InstructionService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Instruction)
    private readonly instructionRepository: Repository<Instruction>,
  ) {}

  // Find all instructions
  findAll(): Promise<Instruction[]> {
    return this.instructionRepository.find();
  }

  // Find one instruction by ID
  async findOne(id: string): Promise<Instruction> {
    const instruction = await this.instructionRepository.findOneBy({
      _id: new ObjectId(id), // Convert string id to ObjectId
    });
    if (!instruction) {
      throw new HttpException('Instruction not found', 404);
    }
    return instruction;
  }

  
   // Update an existing ingredient
   async updateAll(): Promise<boolean> {

    const ings = await this.instructionRepository.find();
    for (const ing of ings) {
      
     
      const rec = await this.recipeRepository.findOne({where: {recipeId: parseInt(ing.recipeId)}})
      if(rec) {
        ing.recipeId = rec._id.toString();
        ing.updatedAt = new Date();
        ing.createdAt = new Date();
        ing.createdBy = 'Admin';
        ing.updatedBy = 'Admin';
        await this.instructionRepository.update({ _id: new ObjectId(ing._id) }, ing);
      }
      
    }
    return true
  }

  // Find instructions by recipeId
  async findByRecipeId(recipeId: string): Promise<Instruction[]> {
    const instructions = await this.instructionRepository.find({
      where: { recipeId },
    });
    if (!instructions.length) {
      throw new HttpException('No instructions found for this recipe', 404);
    }
    return instructions;
  }

  // Create a new instruction
  async create(instructionData: Partial<Instruction>): Promise<Instruction> {
    instructionData.createdAt = new Date();
    instructionData.updatedAt = new Date();
    const instruction = this.instructionRepository.create(instructionData);
    return this.instructionRepository.save(instruction);
  }

  // Update an existing instruction
  async update(id: string, instructionData: Partial<Instruction>): Promise<Instruction> {
    instructionData.updatedAt = new Date();
    await this.instructionRepository.update(new ObjectId(id), instructionData);
    return this.findOne(id);
  }

  // Remove an instruction by ID
  async remove(id: string): Promise<void> {
    const result = await this.instructionRepository.delete(new ObjectId(id));
    if (result.affected === 0) {
      throw new HttpException('Instruction not found', 404);
    }
  }
}
