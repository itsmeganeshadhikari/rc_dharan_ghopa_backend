import { Field, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  isClubMeeting?: boolean;

  @Field(() => ID)
  clubId!: string;
}
