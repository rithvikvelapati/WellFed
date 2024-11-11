import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('Recipe')
export class Recipe {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'int' })
  recipeId: number;  // Unique identifier for the recipe within the application

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @Column({ type: 'int' })
  preparationTime: number;

  @Column({ type: 'int'})
  totalTime: number;

  @Column({ type: 'int' })
  servings: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'text'})
  quickTips: string;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ type: 'varchar', length: 255 })
  authorId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;
}
