import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  // Optional email field, validates only if provided
  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;

  // Optional name field with string type and length constraints to prevent excessive input size
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Name must be at most 50 characters' })
  name?: string;
}
