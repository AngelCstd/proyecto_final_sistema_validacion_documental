import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, RolesUser } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function seedUser(email: string, plainPassword: string, nombre: string, rol: RolesUser) {
  const password = await bcrypt.hash(plainPassword, SALT_ROUNDS);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password, nombre, rol },
  });
}

async function main() {
  await seedUser('admin@prueba.com', 'admin', 'admin', RolesUser.ADMIN);
  await seedUser('capturista@prueba.com', 'capturista', 'capturista', RolesUser.CAPTURISTA);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
