import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column, Index } from 'typeorm';

@Entity('Instruction')
export class Instruction {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recipeId: string;

  @Column({ type: 'int' })
  stepNumber: number;

  @Column({ type: 'text' })
  instruction: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string;
}
