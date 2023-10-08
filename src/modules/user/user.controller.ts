import { Controller, Get, Post, Patch, Delete, Param, Body, Res, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { HttpHelper } from 'src/helper/http.helper';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly httpHelper: HttpHelper) {}

  @Get()
  async getAllUsers(@Res() res: Response) {
    const users: any = await this.userService.getAll();
    return this.httpHelper.generateResponse(200, users, res);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Patch(':id')
  async create(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto, @Res() res: Response): Promise<any> {
    try {
      const result: any = await this.userService.updateUser(id, userUpdateDto);
      return this.httpHelper.generateResponse(201, result, res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      const result: any = this.userService.deleteUser(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
