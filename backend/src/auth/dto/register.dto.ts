import { IsEmail, MinLength } from 'class-validator';

// Define que datos esperamos en el body de POST /auth/register
// y las reglas que el ValidationPipe global va a validar automaticamente.
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
