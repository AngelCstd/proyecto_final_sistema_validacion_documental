import { StatusDocument } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateDocumentDto {
  @IsEnum(StatusDocument)
  estado!: StatusDocument;
}
