import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: any) {
    // Implement login logic and generate a JWT token
    const token = await this.authService.generateJwtToken(loginData);
    return { token };
  }
}