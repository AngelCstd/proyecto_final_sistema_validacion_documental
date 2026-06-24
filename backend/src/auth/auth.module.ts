import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    // PassportModule habilita el sistema de "strategies" de Passport (usamos la de JWT).
    PassportModule,
    // registerAsync nos deja leer el secret y el tiempo de expiracion desde el .env
    // (via ConfigService) en vez de hardcodearlos.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>('JWT_SECRET', 'dev-secret'),
        signOptions: {
          expiresIn: configService.get<string>(
            'JWT_EXPIRES_IN',
            '1d',
          ) as NonNullable<JwtModuleOptions['signOptions']>['expiresIn'],
        },
      }),
    }),
  ],
  controllers: [AuthController],
  // JwtStrategy se registra como provider para que Passport la pueda usar
  // cada vez que un endpoint use JwtAuthGuard.
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
