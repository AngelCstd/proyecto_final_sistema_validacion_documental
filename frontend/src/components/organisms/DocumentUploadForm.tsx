"use client";

import { useUploadDocumentForm } from "@/hooks/use-upload-document-form";
import { qrPositionOptions } from "@/lib/qr-position";
import { TitleCard } from "@/components/molecules/TitleCard";
import { FormField } from "@/components/molecules/FormField";
import { SelectField } from "@/components/molecules/SelectField";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { FieldError } from "@/components/atoms/FieldError";

export function DocumentUploadForm() {
  const {
    titulo,
    setTitulo,
    tipo,
    setTipo,
    areaEmisora,
    setAreaEmisora,
    qrPosicion,
    setQrPosicion,
    setFile,
    error,
    isSubmitting,
    handleSubmit,
  } = useUploadDocumentForm();

  return (
    <TitleCard title="Subir documento">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          id="titulo"
          label="Título"
          required
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />
        <FormField
          id="tipo"
          label="Tipo de documento"
          required
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
        />
        <FormField
          id="areaEmisora"
          label="Área emisora"
          required
          value={areaEmisora}
          onChange={(event) => setAreaEmisora(event.target.value)}
        />
        <SelectField
          id="qrPosicion"
          label="Posición del QR"
          value={qrPosicion}
          onChange={(event) =>
            setQrPosicion(event.target.value as typeof qrPosicion)
          }
        >
          {qrPositionOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="file">Archivo PDF</Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="application/pdf"
            required
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </div>
        <FieldError message={error} />
        <Button type="submit" isLoading={isSubmitting}>
          Subir documento
        </Button>
      </form>
    </TitleCard>
  );
}
