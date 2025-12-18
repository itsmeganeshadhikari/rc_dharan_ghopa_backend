// src/seed/seed.service.ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Club } from '../club/club.entity';
import { AdminUser, AdminRole } from '../auth/admin-user.entity';
import { loadSeedConfig } from './seed.config';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);
  private readonly config = loadSeedConfig();

  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,

    @InjectRepository(AdminUser)
    private readonly adminRepository: Repository<AdminUser>,
  ) {}

  /**
   * Automatically called once when the Nest application has bootstrapped.
   * Safe place to perform idempotent seeding.
   */
  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.seed();
      this.logger.log('Database seeding completed.');
    } catch (error) {
      this.logger.error('Database seeding failed.', (error as Error).stack);
    }
  }

  private async seed(): Promise<void> {
    const club = await this.ensureDefaultClub();
    await this.ensureDefaultAdmin(club);
  }

  /**
   * Ensures that the default club exists.
   * If a club with that name already exists, it is reused.
   */
  private async ensureDefaultClub(): Promise<Club> {
    const { name } = this.config.club;

    let club = await this.clubRepository.findOne({
      where: { name },
    });

    if (club) {
      this.logger.log(`Club "${name}" already exists. Skipping club creation.`);
      return club;
    }

    club = this.clubRepository.create({
      name: this.config.club.name,
      riClubNumber: this.config.club.riClubNumber,
      districtNumber: this.config.club.districtNumber,
      city: this.config.club.city,
      country: this.config.club.country,
      charterDate: this.config.club.charterDate,
    });

    const savedClub = await this.clubRepository.save(club);
    this.logger.log(`Created default club "${savedClub.name}".`);

    return savedClub;
  }

  /**
   * Ensures that the default admin user exists.
   * Checks by username; if not present, creates one with a hashed password.
   * Optionally you can later add a relation to Club if needed.
   */
  private async ensureDefaultAdmin(_club: Club): Promise<AdminUser> {
    const { username, password, role } = this.config.admin;

    let admin = await this.adminRepository.findOne({
      where: { username },
    });

    if (admin) {
      this.logger.log(
        `Admin user "${username}" already exists. Skipping admin creation.`,
      );
      return admin;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    admin = this.adminRepository.create({
      username,
      password: passwordHash,
      role: role ?? AdminRole.ADMIN,
    });

    const savedAdmin = await this.adminRepository.save(admin);

    if (process.env.NODE_ENV !== 'production') {
      this.logger.warn(
        `Created default admin "${savedAdmin.username}". ` +
          `Make sure to change the password in a real environment.`,
      );
    } else {
      this.logger.log(
        `Created default admin "${savedAdmin.username}". Password is not logged.`,
      );
    }

    return savedAdmin;
  }
}
