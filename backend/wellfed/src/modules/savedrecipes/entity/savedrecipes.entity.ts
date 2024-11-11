import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('SavedRecipes')
export class SavedRecipes {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar' })
  recipeId: string;  // Foreign key linking to Recipe entity

  @Column({ type: 'varchar', length: 255 })
  userId: string;  // Foreign key linking to User entity

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;
}
