import { z } from 'zod'

export const departamentoSchema = z.object({
  id: z.string(),
  piso: z.string().min(1, 'Requerido'),
  numero: z.string().min(1, 'Requerido'),
  estado: z.enum(['disponible', 'ocupado', 'mantenimiento']),
  ocupanteId: z.string().nullable(),
})

export const departamentoFormSchema = departamentoSchema.omit({ id: true }).extend({
  ocupanteId: z.string().optional().nullable(),
})

export type Departamento = z.infer<typeof departamentoSchema>
export type DepartamentoFormValues = z.infer<typeof departamentoFormSchema>
