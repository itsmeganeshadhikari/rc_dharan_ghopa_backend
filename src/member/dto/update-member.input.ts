import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateMemberInput } from './create-member.input';

@InputType()
export class UpdateMemberInput extends PartialType(CreateMemberInput) {
  @Field(() => ID)
  id!: string;
}
