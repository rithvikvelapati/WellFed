import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // Find a profile by ID
  async getProfile(id: any): Promise<Profile> {
    return await this.profileRepository.findOneBy({ clerkId: id});
  }

  // Create a new profile
  async createProfile(profileData: Partial<Profile>): Promise<Profile> {
    if (!profileData.clerkId) {
        throw new HttpException('Clerk Id Not Found', 400)
    }
    profileData.updatedAt = new Date();
    profileData.createdAt = new Date();
    profileData.updatedBy = profileData.clerkId;
    profileData.createdBy = profileData.clerkId;
    const profile = this.profileRepository.create(profileData);
    return await this.profileRepository.save(profile);
  }

  // Update a profile
  async updateProfile(id: string, profileData: Partial<Profile>): Promise<Profile> {
    if (!profileData.clerkId) {
        throw new HttpException('Clerk Id Not Found', 400)
    }
    profileData.updatedAt = new Date();
    profileData.updatedBy = profileData.clerkId;
    const dbProfile = await this.profileRepository.findOneBy({ clerkId: id});
    if (dbProfile) {
        await this.profileRepository.update(dbProfile?.id, profileData);
    } else {
        throw new HttpException('Profile Not found', 404)
    }
   
    return this.getProfile(id);
  }

  // Get all profiles
  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }

  
}
