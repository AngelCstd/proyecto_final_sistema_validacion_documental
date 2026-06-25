import { createReadStream } from 'fs';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RolesUser } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('validate/:folio')
  validate(@Param('folio') folio: string) {
    return this.documentsService.validateByFolio(folio);
  }

  // Protegida — listado del repositorio de documentos (sección 6.5).
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.documentsService.getDocuments();
  }

  // Protegida — descarga el PDF con QR.
  @UseGuards(JwtAuthGuard)
  @Get(':folio/download')
  async download(@Param('folio') folio: string) {
    const document = await this.documentsService.downloadDocument(folio);

    const fullPath = join(process.cwd(), 'uploads', document.qrPdfPath);

    return new StreamableFile(createReadStream(fullPath), {
      type: 'application/pdf',
      disposition: `attachment; filename="${folio}.pdf"`,
    });
  }

  // Protegida — detalle de un documento específico.
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.documentsService.getDocumentById(id);
  }

  // Protegida — solo ADMIN puede ver el historial de validaciones.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesUser.ADMIN)
  @Get(':id/validations')
  getValidations(@Param('id') id: string) {
    return this.documentsService.getValidations(id);
  }

  // Protegida — solo ADMIN puede ver la bitácora.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesUser.ADMIN)
  @Get(':id/bitacora')
  getBitacora(@Param('id') id: string) {
    return this.documentsService.getBitacora(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'originals'),
        filename: (_req, file, callback) => {
          const uniqueName = `${randomUUID()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException('Solo se permiten archivos PDF'),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateDocumentDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.documentsService.crearDocumentoConQr(file, body, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesUser.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateDocumentDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.documentsService.actualizarDocumento(
      id,
      body.estado,
      req.user.id,
    );
  }
}
