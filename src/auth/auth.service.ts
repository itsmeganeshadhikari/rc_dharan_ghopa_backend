import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AdminUser, AdminRole } from './admin-user.entity';
import { RegisterAdminInput } from './dto/register-admin.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.type';
import { AuthRefreshResponse } from './dto/auth-refresh-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminRepo: Repository<AdminUser>,
    private readonly jwtService: JwtService,
  ) {}

  async registerAdmin(input: RegisterAdminInput): Promise<AdminUser> {
    const existing = await this.adminRepo.findOne({ where: { username: input.username } });
    if (existing) {
      throw new BadRequestException('Username already taken');
    }
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = this.adminRepo.create({
      username: input.username,
      password: passwordHash,
      role: input.role ?? AdminRole.ADMIN,
    });
    return this.adminRepo.save(user);
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.adminRepo.findOne({ where: { username: input.username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, username: user.username, role: user.role };
     const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

    // Generate refresh token (expires in 7 days)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken, user };
  }

   // Refresh the access token using the refresh token
  async refresh(refreshToken: string): Promise<AuthRefreshResponse> {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
      const payload = { sub: decoded.sub, username: decoded.username, role: decoded.role };
      const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
