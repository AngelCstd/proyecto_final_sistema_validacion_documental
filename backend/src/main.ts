import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

//Esta parte del codigo solo inicializa la validación de los DTOs y levanta el servidor.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite que el front (corriendo en otro puerto) llame a esta API desde el navegador,
  // y que pueda enviar/recibir la cookie httpOnly con el JWT (credentials: true).
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3001',
    credentials: true,
  });

  // Necesario para poder leer la cookie httpOnly que guarda el JWT en cada request.
  app.use(cookieParser());

  //Esto hace que mis DTOS solo acepten las propiedades que yo defina, y no se puedan enviar propiedades adicionales
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
