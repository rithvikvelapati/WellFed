import { ObjectId } from 'mongodb';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instruction } from '../entity/instruction.entity';

@Injectable()
export class InstructionService {
  constructor(
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
