import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('Ingredient')
export class Ingredient {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'int' })
  recipeId: number;  // Foreign key linking to Recipe entity

  @Column({ type: 'varchar', length: 255 })
  title: string;  // Name of the ingredient

  @Column({ type: 'int' })
  quantity: number;  // Quantity of the ingredient

  @Column({ type: 'varchar', length: 50 })
  unit: string;  // Unit of measurement, e.g., 'g', 'ml', etc.

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
