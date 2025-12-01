import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Club } from './club.entity';
import { ClubService } from './club.service';
import { CreateClubInput } from './dto/create-club.input';
import { UpdateClubInput } from './dto/update-club.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from '../auth/admin-user.entity';

@Resolver(() => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @Query(() => String)
  healthCheck(): string {
    return 'RC Dharan Ghopa API is running';
  }

  @Query(() => [Club])
  clubs(): Promise<Club[]> {
    return this.clubService.findAll();
  }

  @Query(() => Club)
  club(@Args('id', { type: () => ID }) id: string): Promise<Club> {
    return this.clubService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SECRETARY)
  @Mutation(() => Club)
  createClub(@Args('input') input: CreateClubInput): Promise<Club> {
    return this.clubService.create(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SECRETARY)
  @Mutation(() => Club)
  updateClub(@Args('input') input: UpdateClubInput): Promise<Club> {
    return this.clubService.update(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN)
  @Mutation(() => Boolean)
  removeClub(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.clubService.remove(id);
  }
}
