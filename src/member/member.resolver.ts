import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from '../auth/admin-user.entity';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => [Member])
  members(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Query(() => [Member])
  membersByClub(@Args('clubId', { type: () => ID }) clubId: string): Promise<Member[]> {
    return this.memberService.findByClub(clubId);
  }

  @Query(() => Member)
  member(@Args('id', { type: () => ID }) id: string): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SECRETARY)
  @Mutation(() => Member)
  createMember(@Args('input') input: CreateMemberInput): Promise<Member> {
    return this.memberService.create(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SECRETARY)
  @Mutation(() => Member)
  updateMember(@Args('input') input: UpdateMemberInput): Promise<Member> {
    return this.memberService.update(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN)
  @Mutation(() => Boolean)
  removeMember(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.memberService.remove(id);
  }
}
