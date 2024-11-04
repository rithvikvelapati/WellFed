import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entity/review.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  // Find all reviews
  findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  // Find a review by ID
  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!review) {
      throw new HttpException('Review not found', 404);
    }
    return review;
  }

  // Create a new review
  async create(reviewData: Partial<Review>): Promise<Review> {
    reviewData.createdAt = new Date();
    reviewData.updatedAt = new Date();
    const review = this.reviewRepository.create(reviewData);
    return this.reviewRepository.save(review);
  }

  // Update an existing review
  async update(id: string, reviewData: Partial<Review>): Promise<Review> {
    reviewData.updatedAt = new Date();
    const updateResult = await this.reviewRepository.update(
      { _id: new ObjectId(id) },
      reviewData,
    );
    if (updateResult.affected === 0) {
      throw new HttpException('Review not found', 404);
    }
    return this.findOne(id);
  }

  // Remove a review by ID
  async remove(id: string): Promise<void> {
    const result = await this.reviewRepository.delete({ _id: new ObjectId(id) });
    if (result.affected === 0) {
      throw new HttpException('Review not found', 404);
    }
  }
}
