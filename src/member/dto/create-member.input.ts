import { Field, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field()
  fullName!: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  classification?: string;

  @Field({ nullable: true })
  rotaryId?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  joinDate?: Date;

  @Field(() => ID)
  clubId!: string;
}
