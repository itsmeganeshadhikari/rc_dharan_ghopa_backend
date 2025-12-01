import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from '../auth/admin-user.entity';
import { GraphQLISODateTime } from '@nestjs/graphql';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event])
  events(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Query(() => [Event])
  eventsByClub(@Args('clubId', { type: () => ID }) clubId: string): Promise<Event[]> {
    return this.eventService.findByClub(clubId);
  }

  @Query(() => [Event])
  eventsByDateRange(
    @Args('from', { type: () => GraphQLISODateTime }) from: Date,
    @Args('to', { type: () => GraphQLISODateTime }) to: Date,
  ): Promise<Event[]> {
    return this.eventService.findByDateRange(from, to);
  }

  @Query(() => Event)
  event(@Args('id', { type: () => ID }) id: string): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SECRETARY)
  @Mutation(() => Event)
  createEvent(@Args('input') input: CreateEventInput): Promise<Event> {
    return this.eventService.create(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SECRETARY)
  @Mutation(() => Event)
  updateEvent(@Args('input') input: UpdateEventInput): Promise<Event> {
    return this.eventService.update(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN)
  @Mutation(() => Boolean)
  removeEvent(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.eventService.remove(id);
  }
}
