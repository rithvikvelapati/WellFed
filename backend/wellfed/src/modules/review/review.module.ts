import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { ReviewService } from './service/review.service';
import { ReviewController } from './controller/review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
