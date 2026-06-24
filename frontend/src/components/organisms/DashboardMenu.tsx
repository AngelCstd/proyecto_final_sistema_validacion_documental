import { MenuItem } from "@/components/molecules/MenuItem";
import { Text } from "@/components/atoms/Text";

export function DashboardMenu() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-md">
      <Text variant="title">Menú de Dashboard</Text>
      <div className="flex w-full justify-center items-center gap-4 flex-1">
        <MenuItem
          href="/documentos"
          title="Documentos"
          description="Sube, consulta y administra los documentos registrados."
        />
      </div>
    </div>
  );
}
