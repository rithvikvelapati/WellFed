import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutrition } from './entity/nutrition.entity';
import { NutritionService } from './service/nutrition.service';
import { NutritionController } from './controller/nutrition.controller';
import { Recipe } from '../recipe/entity/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrition]), TypeOrmModule.forFeature([Recipe])],
  providers: [NutritionService],
  controllers: [NutritionController],
})
export class NutritionModule {}
