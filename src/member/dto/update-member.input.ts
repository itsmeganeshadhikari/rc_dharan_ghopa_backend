// src/member/dto/update-member.input.ts
import {
  Field,
  ID,
  InputType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Gender, MemberStatus } from '../enums/member-status.enum';

@InputType()
export class UpdateMemberInput {
  @Field(() => ID)
  @IsUUID()
  id!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string;
  
  @Field(() => Gender, { nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  classification?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  rotaryId?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDateString()
  joinDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  clubId?: string;

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  role?: string; // or change to enum if needed

  @Field(() => MemberStatus, { nullable: true })
  @IsOptional()
  @IsEnum(MemberStatus)
  status?: MemberStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
