import { IsEmail, IsString } from 'class-validator';

// Datos esperados en el body de POST /auth/login.
// Aqui no validamos largo minimo: si la contraseña esta mal, AuthService
// ya se encarga de rechazarla con un 401, no hace falta duplicar esa regla.
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
