import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';
import { CreateClubInput } from './dto/create-club.input';
import { UpdateClubInput } from './dto/update-club.input';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  findAll(): Promise<Club[]> {
    return this.clubRepo.find({ relations: ['members', 'events'] });
  }

  async findOne(id: string): Promise<Club> {
    const club = await this.clubRepo.findOne({ where: { id }, relations: ['members', 'events'] });
    if (!club) throw new NotFoundException('Club not found');
    return club;
  }

  async create(input: CreateClubInput): Promise<Club> {
    if (!input.name || !input.name.trim()) throw new BadRequestException('Club name is required');
    const existing = await this.clubRepo.findOne({ where: { name: input.name.trim() } });
    if (existing) throw new BadRequestException('Club name already exists');
    const club = this.clubRepo.create({ ...input, name: input.name.trim() });
    return this.clubRepo.save(club);
  }

  async update(input: UpdateClubInput): Promise<Club> {
    const club = await this.findOne(input.id);
    if (input.name && input.name.trim() !== club.name) {
      const existing = await this.clubRepo.findOne({ where: { name: input.name.trim() } });
      if (existing && existing.id !== club.id) {
        throw new BadRequestException('Club name already exists');
      }
    }
    Object.assign(club, { ...input, name: input.name ? input.name.trim() : club.name });
    return this.clubRepo.save(club);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.clubRepo.delete(id);
    return result.affected !== 0;
  }
}
