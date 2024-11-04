import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entity/ingredient.entity';
import { IngredientController } from './controller/ingredient.controller';
import { IngredientService } from './service/ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService], // Only if needed in other modules
})
export class IngredientModule {}
