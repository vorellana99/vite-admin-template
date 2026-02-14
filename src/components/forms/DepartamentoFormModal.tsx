import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUIStore } from '@/stores/ui'
import { useDepartamentos, useCreateDepartamento, useUpdateDepartamento } from '@/hooks/useDepartamentos'
import {
  departamentoFormSchema,
  type DepartamentoFormValues,
} from '@/schemas'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const defaultValues: DepartamentoFormValues = {
  piso: '',
  numero: '',
  estado: 'disponible',
  ocupanteId: null,
}

export function DepartamentoFormModal() {
  const open = useUIStore((s) => s.modalDepartamentoOpen)
  const editingId = useUIStore((s) => s.editingDepartamentoId)
  const close = useUIStore((s) => s.closeDepartamentoModal)
  const { data: departamentos } = useDepartamentos()
  const createMutation = useCreateDepartamento()
  const updateMutation = useUpdateDepartamento()

  const form = useForm<DepartamentoFormValues>({
    resolver: zodResolver(departamentoFormSchema),
    defaultValues,
  })

  const departamento = editingId
    ? departamentos?.find((d) => d.id === editingId)
    : null

  useEffect(() => {
    if (open && departamento) {
      form.reset({
        piso: departamento.piso,
        numero: departamento.numero,
        estado: departamento.estado,
        ocupanteId: departamento.ocupanteId,
      })
    } else if (open && !editingId) {
      form.reset(defaultValues)
    }
  }, [open, editingId, departamento, form])

  const onSubmit = (values: DepartamentoFormValues) => {
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, values },
        {
          onSuccess: () => {
            close()
            form.reset(defaultValues)
          },
        }
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          close()
          form.reset(defaultValues)
        },
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && close()}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {editingId ? 'Editar departamento' : 'Crear departamento'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="piso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Piso</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="ocupado">Ocupado</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => close()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={
                  createMutation.isPending || updateMutation.isPending
                }
              >
                {editingId ? 'Guardar' : 'Crear'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
