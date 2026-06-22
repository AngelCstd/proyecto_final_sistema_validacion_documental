import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ACCESS_TOKEN_COOKIE } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

//Este valor se debe actualizar si se cambia en env el valor de JWT_EXPIRES_IN.
const COOKIE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Body() toma el JSON del request y lo convierte en RegisterDto.
  // El ValidationPipe global (configurado en main.ts) valida ese DTO automaticamente
  // antes de que el codigo de aqui se ejecute.
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.register(dto);
    this.setAuthCookie(res, accessToken);
    return { user };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(dto);
    this.setAuthCookie(res, accessToken);
    return { user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE);
    return { success: true };
  }

  // @UseGuards(JwtAuthGuard) protege esta ruta: solo deja pasar si el request
  // trae la cookie httpOnly con un JWT valido.
  // Si el guard pasa, Passport mete el usuario decodificado del token en req.user.
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  me(@Req() req: { user: { id: string; email: string } }) {
    return req.user;
  }

  // El JWT nunca se devuelve en el body: viaja solo en una cookie httpOnly
  // para que el JavaScript del navegador no pueda leerlo (mitiga robo via XSS).
  private setAuthCookie(res: Response, accessToken: string) {
    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE_MS,
      path: '/',
    });
  }
}
