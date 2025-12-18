// src/member/member.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { Club } from '../club/club.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { MemberStatus } from './enums/member-status.enum';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.memberRepo.find({ relations: ['club'] });
  }

  async findByClub(clubId: string): Promise<Member[]> {
    return this.memberRepo.find({
      where: { clubId },
      relations: ['club'],
    });
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberRepo.findOne({
      where: { id },
      relations: ['club'],
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  async create(input: CreateMemberInput): Promise<Member> {
    if (!input.fullName || !input.fullName.trim()) {
      throw new BadRequestException('Member full name is required');
    }

     const club = await this.clubRepo.findOne({
      where: { name: process.env.SEED_CLUB_NAME },
    });

    if (!club) {
      throw new BadRequestException('Invalid clubId');
    }

    const { ...data } = input;

    const status = input.status ?? MemberStatus.Active;

    const member = this.memberRepo.create({
      ...data,
      fullName: input.fullName.trim(),
      clubId: club.id,
      club,
      status,
      isActive:
        input.isActive ??
        (status === MemberStatus.Inactive ? false : true),
    });

    return this.memberRepo.save(member);
  }

  async update(input: UpdateMemberInput): Promise<Member> {
    const member = await this.findOne(input.id);

    // If club changed, validate and set
    if (input.clubId && input.clubId !== member.clubId) {
      const club = await this.clubRepo.findOne({
        where: { id: input.clubId },
      });
      if (!club) {
        throw new BadRequestException('Invalid clubId');
      }
      member.club = club;
      member.clubId = club.id;
    }

    // If status provided, update status and possibly isActive
    if (input.status) {
      member.status = input.status;

      // If isActive not explicitly set, infer from status
      if (typeof input.isActive === 'undefined') {
        member.isActive = input.status !== MemberStatus.Inactive;
      }
    }

    Object.assign(member, {
      ...input,
      fullName: input.fullName
        ? input.fullName.trim()
        : member.fullName,
      club: member.club,
      clubId: member.clubId,
    });

    return this.memberRepo.save(member);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.memberRepo.delete(id);
    return result.affected !== 0;
  }
}
