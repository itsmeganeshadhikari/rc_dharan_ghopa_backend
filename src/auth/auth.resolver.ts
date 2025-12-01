import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.type';
import { LoginInput } from './dto/login.input';
import { RegisterAdminInput } from './dto/register-admin.input';
import { AdminUser } from './admin-user.entity';
import { log } from 'console';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AdminUser)
  registerAdmin(@Args('input') input: RegisterAdminInput): Promise<AdminUser> {
    log('RegisterAdminInput:', input);
    return this.authService.registerAdmin(input);
  }

  @Mutation(() => AuthResponse)
  login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.authService.login(input);
  }

  @Query(() => String)
  authHealth(): string {
    return 'Auth module OK';
  }
}
