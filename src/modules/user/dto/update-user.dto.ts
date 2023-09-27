import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsDate, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsOptional()
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