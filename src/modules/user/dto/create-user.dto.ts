import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty({ message: 'Username should not be empty' })
    username: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password should not be empty' })
    @MinLength(5, { message: 'Password should be at least 5 characters long' })
    password: string;

    @IsOptional()
    @IsString()
    user_token: string;

    @IsOptional()
    @IsDate()
    created_at: Date;

    @IsOptional()
    @IsDate()
    updated_at: Date;
}