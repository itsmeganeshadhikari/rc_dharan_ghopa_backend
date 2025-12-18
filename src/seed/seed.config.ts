// src/seed/seed.config.ts
import { AdminRole } from '../auth/admin-user.entity';

export interface SeedClubConfig {
  name: string;
  riClubNumber?: string;
  districtNumber?: string;
  city?: string;
  country?: string;
  charterDate?: Date;
}

export interface SeedAdminConfig {
  username: string;
  password: string;
  role: AdminRole;
}

export interface SeedConfig {
  club: SeedClubConfig;
  admin: SeedAdminConfig;
}

/**
 * Reads defaults from environment variables with safe fallbacks.
 */
export const loadSeedConfig = (): SeedConfig => {
  const {
    SEED_CLUB_NAME,
    SEED_CLUB_RI_NUMBER,
    SEED_CLUB_DISTRICT_NUMBER,
    SEED_CLUB_CITY,
    SEED_CLUB_COUNTRY,
    SEED_CLUB_CHARTER_DATE,

    SEED_ADMIN_USERNAME,
    SEED_ADMIN_PASSWORD,
    SEED_ADMIN_ROLE,
  } = process.env;

  return {
    club: {
      name: SEED_CLUB_NAME ?? 'Rotary Club of Dharan Ghopa',
      riClubNumber: SEED_CLUB_RI_NUMBER ?? undefined,
      districtNumber: SEED_CLUB_DISTRICT_NUMBER ?? '3292',
      city: SEED_CLUB_CITY ?? 'Dharan',
      country: SEED_CLUB_COUNTRY ?? 'Nepal',
      charterDate: SEED_CLUB_CHARTER_DATE
        ? new Date(SEED_CLUB_CHARTER_DATE)
        : undefined,
    },
    admin: {
      username: SEED_ADMIN_USERNAME ?? 'admin',
      password: SEED_ADMIN_PASSWORD ?? 'ChangeMe123!',
      role:
        (SEED_ADMIN_ROLE as AdminRole) && Object.values(AdminRole).includes(SEED_ADMIN_ROLE as AdminRole)
          ? (SEED_ADMIN_ROLE as AdminRole)
          : AdminRole.ADMIN,
    },
  };
};
