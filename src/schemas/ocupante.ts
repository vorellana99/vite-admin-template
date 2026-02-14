import { z } from 'zod'

export const ocupanteSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1, 'Requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  departamentoId: z.string().nullable(),
})

export const ocupanteFormSchema = ocupanteSchema.omit({ id: true }).extend({
  departamentoId: z.string().optional().nullable(),
})

export type Ocupante = z.infer<typeof ocupanteSchema>
export type OcupanteFormValues = z.infer<typeof ocupanteFormSchema>
