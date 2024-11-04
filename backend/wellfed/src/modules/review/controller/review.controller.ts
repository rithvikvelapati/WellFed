import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { Review } from '../entity/review.entity';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Get all reviews
  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  // Get a single review by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  // Create a new review
  @Post()
  create(@Body() reviewData: Partial<Review>): Promise<Review> {
    return this.reviewService.create(reviewData);
  }

  // Update a review by ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() reviewData: Partial<Review>,
  ): Promise<Review> {
    return this.reviewService.update(id, reviewData);
  }

  // Delete a review by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewService.remove(id);
  }
}
