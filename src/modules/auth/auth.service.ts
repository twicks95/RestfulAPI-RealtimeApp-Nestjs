import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from 'src/utilities/password.service';
import { JwtAuthService } from './jwt/jwt.service';
import { UserRepository } from '../user/user.repository';
import { PostgresProvider } from 'src/database/postgres/postgres.provider';
import { RefreshTokenRepository } from './jwt/refresh-token.repository';

@Injectable()
export class AuthService {
  private userRepository: any;
  private refreshTokenRepository: any;
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly postgresProvider: PostgresProvider,
  ) {
    this.userRepository = new UserRepository(this.postgresProvider, 'users');
    this.refreshTokenRepository = new RefreshTokenRepository(this.postgresProvider, 'refresh_token');
  }

  async generateJwtToken(payload: any) {
    const data: any = {
      sub: payload.user_id,
      name: payload.name,
      email: payload.email,
    };

    const tokens: any = {
      access_token: this.jwtAuthService.generateAccessToken(data),
      refresh_token: this.jwtAuthService.generateRefreshToken(data),
    };

    // Do insert acces & refresh token to DB
    await this.userService.updateUser(payload.id, tokens);

    return tokens;
  }

  // Implement user authentication logic, user registration, etc.
  async validateUser(payload: any): Promise<any> {
    // Add your user validation logic here, e.g., fetching the user and validate from a database
    try {
      const user: any = await this.userService.findByEmail(payload.email);

      // Compare the provided password with the stored hashed password
      const passwordMatch: boolean = await this.passwordService.comparePasswords(payload.password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credential');
      }

      // Update user login time
      await this.userService.updateUserLoginTime(user.user_id, new Date(Date.now()));

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(loginData: any): Promise<any> {
    try {
      const user: any = await this.validateUser(loginData);
      const payload = user;
      return await this.generateJwtToken(payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(registerData: any): Promise<any> {
    const userExists: any = await this.userRepository.getByEmail(registerData.email);
    if (userExists.length > 0) {
      throw new Error('User already registered!');
    }
    const hashedPassword: string = await this.passwordService.hashPassword(registerData.password);

    // Do insert user data to users table
    try {
      const result: any = await this.userService.createUser({
        ...registerData,
        password: hashedPassword,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateRefreshToken(userId: number): Promise<any> {
    const refreshToken: string = this.jwtAuthService.generateRefreshToken(userId);

    // Store refresh token to refresh_token table
    await this.refreshTokenRepository.create({ userId, token: refreshToken });

    // Return refresh token as response to the client
    return { refresh_token: refreshToken };
  }
}
