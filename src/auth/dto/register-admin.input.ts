import { Field, InputType } from "@nestjs/graphql";
import { AdminRole } from "../admin-user.entity";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterAdminInput {
  @Field()
  @IsString()
  username!: string;

  @Field()
  @IsString()
  @MinLength(4)
  password!: string;

  @Field(() => AdminRole, { nullable: true })
  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;
}
