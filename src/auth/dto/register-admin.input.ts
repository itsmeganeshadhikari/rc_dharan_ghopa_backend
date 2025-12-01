import { Field, InputType } from '@nestjs/graphql';
import { AdminRole } from '../admin-user.entity';

@InputType()
export class RegisterAdminInput {
  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field(() => AdminRole, { nullable: true })
  role?: AdminRole;
}
