import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard('jwt') le dice a Nest: "antes de entrar al controller,
// ejecuta la JwtStrategy (la que registramos con ese mismo nombre 'jwt')".
// Se usa como @UseGuards(JwtAuthGuard) en cualquier ruta que quieras proteger.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
