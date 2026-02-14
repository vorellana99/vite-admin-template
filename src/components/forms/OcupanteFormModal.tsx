import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUIStore } from '@/stores/ui'
import { useDepartamentos } from '@/hooks/useDepartamentos'
import {
  useOcupantes,
  useCreateOcupante,
  useUpdateOcupante,
} from '@/hooks/useOcupantes'
import {
  ocupanteFormSchema,
  type OcupanteFormValues,
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

const defaultValues: OcupanteFormValues = {
  nombre: '',
  email: '',
  telefono: '',
  departamentoId: null,
}

export function OcupanteFormModal() {
  const open = useUIStore((s) => s.modalOcupanteOpen)
  const editingId = useUIStore((s) => s.editingOcupanteId)
  const close = useUIStore((s) => s.closeOcupanteModal)
  const { data: departamentos } = useDepartamentos()
  const { data: ocupantes } = useOcupantes()
  const createMutation = useCreateOcupante()
  const updateMutation = useUpdateOcupante()

  const form = useForm<OcupanteFormValues>({
    resolver: zodResolver(ocupanteFormSchema),
    defaultValues,
  })

  const ocupante = editingId
    ? ocupantes?.find((o) => o.id === editingId)
    : null

  useEffect(() => {
    if (open && ocupante) {
      form.reset({
        nombre: ocupante.nombre,
        email: ocupante.email,
        telefono: ocupante.telefono ?? '',
        departamentoId: ocupante.departamentoId,
      })
    } else if (open && !editingId) {
      form.reset(defaultValues)
    }
  }, [open, editingId, ocupante, form])

  const onSubmit = (values: OcupanteFormValues) => {
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
            {editingId ? 'Editar ocupante' : 'Crear ocupante'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+56 9 1234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departamentoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento (opcional)</FormLabel>
                  <Select
                    onValueChange={(v) =>
                      field.onChange(v === '__none__' ? null : v)
                    }
                    value={field.value ?? '__none__'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ninguno" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="__none__">Ninguno</SelectItem>
                      {departamentos?.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.piso}-{d.numero}
                        </SelectItem>
                      ))}
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
