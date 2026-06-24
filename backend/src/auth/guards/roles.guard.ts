import { ForbiddenException, Injectable, type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { RolesUser } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

// Se usa junto con JwtAuthGuard: @UseGuards(JwtAuthGuard, RolesGuard) + @Roles(RolesUser.ADMIN).
// Si la ruta no tiene @Roles(...), deja pasar a cualquier usuario autenticado.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RolesUser[] | undefined>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: { rol: RolesUser };
    }>();

    const userRol = request.user?.rol;
    if (!userRol || !requiredRoles.includes(userRol)) {
      throw new ForbiddenException(
        'No tienes permisos para realizar esta acción',
      );
    }

    return true;
  }
}
