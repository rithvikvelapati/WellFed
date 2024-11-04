import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrition } from './entity/nutrition.entity';
import { NutritionService } from './service/nutrition.service';
import { NutritionController } from './controller/nutrition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrition])],
  providers: [NutritionService],
  controllers: [NutritionController],
})
export class NutritionModule {}
