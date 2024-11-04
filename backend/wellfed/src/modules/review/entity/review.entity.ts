import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('Review')
export class Review {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'int' })
  recipeId: number;  // Foreign key linking to Recipe entity

  @Column({ type: 'varchar', length: 255 })
  userId: string;  // Foreign key linking to User entity

  @Column({ type: 'float', nullable: true })
  rating: number;  // Optional rating provided by the user

  @Column({ type: 'text', nullable: true })
  comment: string;  // Optional comment provided by the user

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;
}
