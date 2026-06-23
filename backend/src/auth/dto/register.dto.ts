import { RolesUser } from '@prisma/client';
import { IsEmail, MinLength, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @MinLength(3)
  nombre!: string;

  @IsEnum(RolesUser)
  rol!: RolesUser;
}
