import { useOcupantes } from '@/hooks/useOcupantes'
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
import { OcupanteFormModal } from '@/components/forms/OcupanteFormModal'

export function OcupantesPage() {
  const { data: ocupantes, isLoading, error } = useOcupantes()
  const { data: departamentos } = useDepartamentos()
  const openModal = useUIStore((s) => s.openOcupanteModal)

  const getDeptoLabel = (id: string | null) => {
    if (!id || !departamentos) return '—'
    const d = departamentos.find((x) => x.id === id)
    return d ? `${d.piso}-${d.numero}` : '—'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Ocupantes
          </h1>
          <p className="text-muted-foreground">
            Lista de ocupantes del edificio
          </p>
        </div>
        <Button onClick={() => openModal()} className="shrink-0">
          <Plus className="h-4 w-4" />
          Crear ocupante
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold leading-none tracking-tight">Lista de ocupantes</h2>
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
          {ocupantes && ocupantes.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay ocupantes. Crea uno para comenzar.
            </p>
          )}
          {ocupantes && ocupantes.length > 0 && (
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ocupantes.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>{o.nombre}</TableCell>
                      <TableCell>{o.email}</TableCell>
                      <TableCell>{o.telefono ?? '—'}</TableCell>
                      <TableCell>{getDeptoLabel(o.departamentoId)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModal(o.id)}
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

      <OcupanteFormModal />
    </div>
  )
}
