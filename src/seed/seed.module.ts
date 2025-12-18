// src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Club } from '../club/club.entity';
import { AdminUser } from '../auth/admin-user.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Club, AdminUser])],
  providers: [SeedService],
})
export class SeedModule {}
