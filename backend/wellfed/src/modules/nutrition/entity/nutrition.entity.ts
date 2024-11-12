import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('Nutrition')
export class Nutrition {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  recipeId: string;  // Foreign key linking to Recipe entity

  @Column({ type: 'int' })
  calories: number;  // Calories per serving

  @Column({ type: 'int' })
  protein: number;  // Protein content per serving

  @Column({ type: 'int' })
  fat: number;  // Fat content per serving

  @Column({ type: 'int' })
  carbohydrates: number;  // Carbohydrates content per serving

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;
}
