import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateClubInput {
  @Field()
  @IsString()
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  riClubNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  districtNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDate()
  charterDate?: Date;
}
