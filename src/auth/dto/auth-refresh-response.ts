import { Field, ObjectType } from '@nestjs/graphql';
import { AdminUser } from '../admin-user.entity';

@ObjectType()
export class AuthRefreshResponse {
  @Field()
  accessToken!: string;
}
