import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../users/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// Cantidad de "rondas" que aplica bcrypt al generar el hash. Mas alto = mas seguro pero mas lento.
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    // @Inject(USER_REPOSITORY) le dice a Nest: "inyecta lo que sea que este
    // registrado bajo este token", en vez de pedir una clase concreta.
    // Por eso AuthService nunca sabe que existe Prisma, solo conoce el contrato IUserRepository.
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Verificamos que no exista ya un usuario con ese email.
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // 2. Nunca guardamos la contraseña en texto plano, la hasheamos con bcrypt.
    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
    });

    // 3. Igual que en login, devolvemos un token para que quede logueado de una vez.
    return this.buildAuthResponse(user.id, user.email);
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

    return this.buildAuthResponse(user.id, user.email);
  }

  // Genera el JWT que el cliente usara en el header Authorization: Bearer <token>
  // para las siguientes peticiones. "sub" es el campo estandar de JWT para el id del usuario.
  private buildAuthResponse(userId: string, email: string) {
    const accessToken = this.jwtService.sign({ sub: userId, email });
    return {
      accessToken,
      user: { id: userId, email },
    };
  }
}
