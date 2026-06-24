import { QrPosition } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MinLength(1)
  titulo!: string;

  @IsString()
  @MinLength(1)
  tipo!: string;

  @IsString()
  @MinLength(1)
  areaEmisora!: string;

  @IsEnum(QrPosition)
  qrPosicion!: QrPosition;
}
