import type { RolesUser } from '@prisma/client';

export class UserEntity {
  id!: string;
  email!: string;
  rol!: RolesUser;
  nombre!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
