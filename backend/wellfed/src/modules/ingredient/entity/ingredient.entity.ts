import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('Ingredient')
export class Ingredient {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })  // Ensure this matches your data type in MongoDB
  recipeId: string;  // Treating `recipeId` as a number for compatibility

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
