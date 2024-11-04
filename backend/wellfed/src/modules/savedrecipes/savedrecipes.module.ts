import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedRecipes } from './entity/savedrecipes.entity';
import { SavedRecipesService } from './service/savedrecipes.service';
import { SavedRecipesController } from './controller/savedrecipes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SavedRecipes])],
  providers: [SavedRecipesService],
  controllers: [SavedRecipesController],
})
export class SavedRecipesModule {}
