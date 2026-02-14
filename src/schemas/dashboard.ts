import { z } from 'zod'

export const metricasDashboardSchema = z.object({
  gastosMes: z.number(),
  departamentosOcupados: z.number(),
  departamentosTotal: z.number(),
  incidenciasAbiertas: z.number(),
})

export type MetricasDashboard = z.infer<typeof metricasDashboardSchema>
