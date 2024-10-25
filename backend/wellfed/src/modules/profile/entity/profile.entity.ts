import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('User')
export class Profile {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: 'varchar', length: 255 })
    clerkId: string;
  
    @Column({ type: 'varchar', length: 255 })
    firstName: string;
  
    @Column({ type: 'varchar', length: 255 })
    lastName: string;
  
    @Column({ type: 'varchar', length: 255 })
    address: string;
  
    @Column({ type: 'int', default: 0 })
    age: number;
  
    @Column({ type: 'date' })
    birthdate: Date;
  
    @Column({ type: 'varchar', length: 255 })
    email: string;
  
    @Column({ type: 'varchar', length: 50 })
    gender: string;
  
    @Column({ type: 'varchar', length: 15 })
    phoneNumber: string;
  
    @Column({ type: 'varchar', length: 255 })
    profileBannerURL: string;
  
    @Column({ type: 'varchar', length: 255 })
    profilePictureURL: string;
  
    @Column({ type: 'varchar', length: 255 })
    username: string;
  
    @Column({ type: 'timestamp' })
    createdAt: Date;
  
    @Column({ type: 'varchar', length: 255 })
    createdBy: string;
  
    @Column({ type: 'timestamp' })
    updatedAt: Date;
  
    @Column({ type: 'varchar', length: 255 })
    updatedBy: string;
  
    @Column({ type: 'int', default: 0 })
    familyMembers: number;
}
