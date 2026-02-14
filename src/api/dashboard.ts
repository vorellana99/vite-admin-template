import type { MetricasDashboard } from '@/schemas'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchMetricasDashboard(): Promise<MetricasDashboard> {
  await delay(250)
  return {
    gastosMes: 1250000,
    departamentosOcupados: 2,
    departamentosTotal: 4,
    incidenciasAbiertas: 1,
  }
}
