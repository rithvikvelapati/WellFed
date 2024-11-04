import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instruction } from './entity/instruction.entity';
import { InstructionController } from './controller/instruction.controller';
import { InstructionService } from './service/instruction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instruction])],
  controllers: [InstructionController],
  providers: [InstructionService],
  exports: [InstructionService], // Export if needed in other modules
})
export class InstructionModule {}
