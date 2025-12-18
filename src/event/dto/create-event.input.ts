import { Field, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  @MinLength(3)
  title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => GraphQLISODateTime)
  @IsDate()
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isClubMeeting?: boolean;

  @Field(() => ID)
  @IsString()
  clubId!: string;
}
