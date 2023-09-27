import { Controller, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Response } from 'express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('test')
    getData(@Res() res: Response) {
        res.json({ message: "OK" })
    }

    // @Get()
    // async getAllUsers() {
    //     return this.userService.getAllUsers()
    // }

    // @Get(':id')
    // async getUserById(@Param('id') id: number) {
    //     return this.userService.findUserById(id)
    // }

    // @Post()
    // async createUser(@Body() createUserDto: CreateUserDto) {
    //     return this.userService.createUser(createUserDto)
    // }

    // @Put(':id')
    // async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.updateUser(id, updateUserDto);
    // }

    // @Delete(':id')
    // async deleteUser(@Param('id') id: number) {
    //     return this.userService.deleteUser(id)
    // }
}