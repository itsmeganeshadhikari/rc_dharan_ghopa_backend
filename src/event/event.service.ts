import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Event } from './event.entity';
import { Club } from '../club/club.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepo.find({ relations: ['club'] });
  }

  async findByClub(clubId: string): Promise<Event[]> {
    return this.eventRepo.find({ where: { clubId }, relations: ['club'] });
  }

  async findByDateRange(from: Date, to: Date): Promise<Event[]> {
    return this.eventRepo.find({
      where: { startDate: Between(from, to) },
      relations: ['club'],
      order: { startDate: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepo.findOne({ where: { id }, relations: ['club'] });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async create(input: CreateEventInput): Promise<Event> {
    if (!input.title || !input.title.trim()) {
      throw new BadRequestException('Event title is required');
    }
    const club = await this.clubRepo.findOne({ where: { id: input.clubId } });
    if (!club) throw new BadRequestException('Invalid clubId');
    const { clubId, ...data } = input;
    const event = this.eventRepo.create({
      ...data,
      title: input.title.trim(),
      clubId: club.id,
      club,
      isClubMeeting: input.isClubMeeting ?? false,
    });
    return this.eventRepo.save(event);
  }

  async update(input: UpdateEventInput): Promise<Event> {
    const event = await this.findOne(input.id);
    if (input.clubId && input.clubId !== event.clubId) {
      const club = await this.clubRepo.findOne({ where: { id: input.clubId } });
      if (!club) throw new BadRequestException('Invalid clubId');
      event.club = club;
      event.clubId = club.id;
    }
    Object.assign(event, {
      ...input,
      title: input.title ? input.title.trim() : event.title,
      club: event.club,
      clubId: event.clubId,
    });
    return this.eventRepo.save(event);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.eventRepo.delete(id);
    return result.affected !== 0;
  }
}
