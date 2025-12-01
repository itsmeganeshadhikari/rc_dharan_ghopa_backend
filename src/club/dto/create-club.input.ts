import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateClubInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  riClubNumber?: string;

  @Field({ nullable: true })
  districtNumber?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  charterDate?: Date;
}
