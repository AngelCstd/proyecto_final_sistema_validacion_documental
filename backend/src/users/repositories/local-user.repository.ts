import { Injectable } from '@nestjs/common';
import { CreateUserData, IUserRepository } from './user.repository';
import { UserEntity } from '../entities/user.entity';

const users: UserEntity[] = [];

@Injectable()
export class LocalUserRepository implements IUserRepository {
  create(data: CreateUserData): Promise<UserEntity> {
    //Esto lo colocamos porque en la base de datos se deberia hacer automaticamente, pero como esto es un repo "en memoria" lo hacemos a mano
    const newUser: UserEntity = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    users.push(newUser);
    return Promise.resolve(newUser);
  }
  findByEmail(email: string): Promise<UserEntity | null> {
    const user = users.find((u) => u.email === email);
    return Promise.resolve(user || null);
  }
  findById(id: string): Promise<UserEntity | null> {
    const user = users.find((u) => u.id === id);
    return Promise.resolve(user || null);
  }
}
