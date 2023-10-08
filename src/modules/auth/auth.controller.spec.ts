import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return "Hello World!"', () => {
      const loginDto: LoginDto = {
        email: 'teguh.wck95@gmail.com',
        password: 'password',
      };
      type Result = {
        statusCode: 200;
        data: any;
      };
      expect(authController.login(loginDto, response)).toMatchObject<Result>;
    });
  });
});
