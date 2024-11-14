import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../entity/tool.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
  ) {}

  // Find all tools
  findAll(): Promise<Tool[]> {
    return this.toolRepository.find();
  }

  // Find a tool by ID
  async findOne(id: string): Promise<Tool> {
    const tool = await this.toolRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!tool) {
      throw new HttpException('Tool not found', 404);
    }
    return tool;
  }

  // Create a new tool
  async create(toolData: Partial<Tool>): Promise<Tool> {
    toolData.createdAt = new Date();
    toolData.updatedAt = new Date();
    const tool = this.toolRepository.create(toolData);
    return this.toolRepository.save(tool);
  }

  // Update an existing tool
  async update(id: string, toolData: Partial<Tool>): Promise<Tool> {
    toolData.updatedAt = new Date();
    await this.toolRepository.update(new ObjectId(id), toolData);
    return this.findOne(id);
  }

  // Remove a tool by ID
  async remove(id: string): Promise<void> {
    const result = await this.toolRepository.delete(new ObjectId(id));
    if (result.affected === 0) {
      throw new HttpException('Tool not found', 404);
    }
  }
}
