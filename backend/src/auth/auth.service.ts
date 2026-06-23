import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { RolesUser } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../users/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      nombre: dto.nombre,
      rol: dto.rol,
    });

    return this.buildAuthResponse(user.id, user.email, user.rol, user.nombre);
  }

  async login(dto: LoginDto) {
    // 1. Buscamos el usuario por email.
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Comparamos la contraseña enviada contra el hash guardado.
    // bcrypt.compare se encarga de aplicar el mismo proceso de hash y comparar resultados.
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user.id, user.email, user.rol, user.nombre);
  }

  private buildAuthResponse(
    userId: string,
    email: string,
    rol: RolesUser,
    nombre: string,
  ) {
    const accessToken = this.jwtService.sign({ sub: userId, email });
    return {
      accessToken,
      user: { id: userId, email, rol, nombre },
    };
  }
}
