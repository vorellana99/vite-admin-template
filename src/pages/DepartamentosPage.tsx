import { useDepartamentos } from '@/hooks/useDepartamentos'
import { useUIStore } from '@/stores/ui'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus } from 'lucide-react'
import { DepartamentoFormModal } from '@/components/forms/DepartamentoFormModal'

export function DepartamentosPage() {
  const { data: departamentos, isLoading, error } = useDepartamentos()
  const openModal = useUIStore((s) => s.openDepartamentoModal)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Departamentos
          </h1>
          <p className="text-muted-foreground">
            Lista de departamentos del edificio
          </p>
        </div>
        <Button onClick={() => openModal()} className="shrink-0">
          <Plus className="h-4 w-4" />
          Crear departamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold leading-none tracking-tight">Lista de departamentos</h2>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Cargando…</p>
          )}
          {error && (
            <p className="text-sm text-destructive">
              Error al cargar la lista. Intenta de nuevo.
            </p>
          )}
          {departamentos && departamentos.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay departamentos. Crea uno para comenzar.
            </p>
          )}
          {departamentos && departamentos.length > 0 && (
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Piso</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departamentos.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.piso}</TableCell>
                      <TableCell>{d.numero}</TableCell>
                      <TableCell>
                        <span
                          className={
                            d.estado === 'ocupado'
                              ? 'text-green-600'
                              : d.estado === 'mantenimiento'
                                ? 'text-amber-600'
                                : 'text-muted-foreground'
                          }
                        >
                          {d.estado}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModal(d.id)}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <DepartamentoFormModal />
    </div>
  )
}
