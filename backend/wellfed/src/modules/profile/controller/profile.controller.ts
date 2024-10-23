import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ProfileService } from '../service/profile.service';
import { Profile } from 'src/modules/profile/entity/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<Profile> {
    return this.profileService.getProfile(id);
  }

  @Get()
  async getAllProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  @Post()
  async createProfile(@Body() profileData: Partial<Profile>): Promise<Profile> {
    return this.profileService.createProfile(profileData);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() profileData: Partial<Profile>,
  ): Promise<Profile> {
    return this.profileService.updateProfile(id, profileData);
  }
}
