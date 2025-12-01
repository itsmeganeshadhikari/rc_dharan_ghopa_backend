import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { Club } from '../club/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Club])],
  providers: [MemberService, MemberResolver],
  exports: [MemberService],
})
export class MemberModule {}
