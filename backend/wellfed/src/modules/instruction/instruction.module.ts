import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instruction } from './entity/instruction.entity';
import { InstructionController } from './controller/instruction.controller';
import { InstructionService } from './service/instruction.service';
import { Recipe } from '../recipe/entity/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instruction]), TypeOrmModule.forFeature([Recipe])],
  controllers: [InstructionController],
  providers: [InstructionService],
  exports: [InstructionService], // Export if needed in other modules
})
export class InstructionModule {}
