import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from './entity/tool.entity';
import { ToolService } from './service/tool.service';
import { ToolController } from './controller/tool.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tool])],
  providers: [ToolService],
  controllers: [ToolController],
})
export class ToolModule {}
