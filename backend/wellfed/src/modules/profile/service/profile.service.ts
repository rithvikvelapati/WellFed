import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/modules/profile/entity/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // Find a profile by ID
  async getProfile(id: any): Promise<Profile> {
    return await this.profileRepository.findOneBy({ id });
  }

  // Create a new profile
  async createProfile(profileData: Partial<Profile>): Promise<Profile> {
    const profile = this.profileRepository.create(profileData);
    return await this.profileRepository.save(profile);
  }

  // Update a profile
  async updateProfile(id: string, profileData: Partial<Profile>): Promise<Profile> {
    await this.profileRepository.update(id, profileData);
    return this.getProfile(id);
  }

  // Get all profiles
  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }
}
