import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_COOKIE } from '../auth.constants';

// Forma del payload que guardamos dentro del JWT al firmarlo en AuthService.
export interface JwtPayload {
  sub: string;
  email: string;
}

// Lee el JWT desde la cookie httpOnly que el AuthController setea en login/register.
function extractFromCookie(req: Request): string | null {
  return (req.cookies?.[ACCESS_TOKEN_COOKIE] as string | undefined) ?? null;
}

// Esta clase le dice a Passport COMO validar un JWT que llega en un request.
// Se activa cada vez que un endpoint usa @UseGuards(JwtAuthGuard).
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // El token viaja en una cookie httpOnly; ya no se acepta via header Authorization
      // para que el JWT nunca quede expuesto al JavaScript del cliente.
      jwtFromRequest: extractFromCookie,
      // Si el token ya vencio, rechazar el request.
      ignoreExpiration: false,
      // Misma clave secreta usada para firmar el token en AuthModule.
      secretOrKey: configService.get<string>('JWT_SECRET', 'dev-secret'),
    });
  }

  // Si la firma y la expiracion del token son validas, Passport llama a este metodo
  // con el payload decodificado. Lo que devolvemos aqui es lo que termina en req.user.
  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
