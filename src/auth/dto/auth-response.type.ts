import { Field, ObjectType } from '@nestjs/graphql';
import { AdminUser } from '../admin-user.entity';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken!: string;

  @Field(() => AdminUser)
  user!: AdminUser;
}
