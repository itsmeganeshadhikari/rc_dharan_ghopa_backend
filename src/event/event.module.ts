import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { Club } from '../club/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Club])],
  providers: [EventService, EventResolver],
  exports: [EventService],
})
export class EventModule {}
