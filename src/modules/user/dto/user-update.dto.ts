import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsDate, IsNumber } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  @MinLength(5, { message: 'Password should be at least 5 characters long' })
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly access_token: string;

  @IsOptional()
  @IsString()
  readonly refresh_token: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Phone should not be empty' })
  @IsString()
  readonly phone: string;
}
