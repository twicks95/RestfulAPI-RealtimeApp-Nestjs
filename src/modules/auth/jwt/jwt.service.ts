import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { userId },
      {
        expiresIn: '7d', // Customize the token expiration for refresh tokens
      },
    );
  }

  verifyRefreshToken(token: string) {
    try {
      const verifyOptions = {
        
      }
      const decode = this.jwtService.verify(token, )
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
