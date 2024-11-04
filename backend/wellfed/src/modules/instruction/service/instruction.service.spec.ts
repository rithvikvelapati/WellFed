import { Test, TestingModule } from '@nestjs/testing';
import { InstructionService } from './instruction.service';

describe('InstructionService', () => {
  let service: InstructionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstructionService],
    }).compile();

    service = module.get<InstructionService>(InstructionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
