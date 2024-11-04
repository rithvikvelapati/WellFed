import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('Tool')
export class Tool {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'int' })
  recipeId: number;  // Foreign key linking to Recipe entity

  @Column({ type: 'varchar', length: 255 })
  name: string;  // Name of the tool

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;
}
