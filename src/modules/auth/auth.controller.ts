import { Controller, Post, Param, Body, Res, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { HttpHelper } from 'src/helper/http.helper';
import { UserRegistrationDto } from '../user/dto/user-registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly httpHelper: HttpHelper) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    // Implement login logic and generate a JWT token
    try {
      const tokens: any = await this.authService.login(loginDto);
      return this.httpHelper.generateResponse(201, tokens, res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('register')
  async register(@Body() userRegistrationDto: UserRegistrationDto, @Res() res: Response): Promise<any> {
    try {
      const newUser: any = await this.authService.register(userRegistrationDto);
      return this.httpHelper.generateResponse(201, newUser, res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('refresh')
  async generateRefreshToken(@Param() userId: number, @Res() res: Response) {
    const refreshToken: string = await this.authService.generateRefreshToken(userId);
    return this.httpHelper.generateResponse(201, refreshToken, res);
  }
}
