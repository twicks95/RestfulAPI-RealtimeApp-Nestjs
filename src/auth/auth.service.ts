import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  // Implement user authentication logic, user registration, etc.
  async validateUser(payload: any): Promise<any> {
    // Add your user validation logic here, e.g., fetching the user from a database
    // For this example, let's assume a simple user object
    const user = { id: payload.sub, username: payload.username };
    return user;
  }
}