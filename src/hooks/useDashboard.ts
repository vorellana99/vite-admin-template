import { useQuery } from '@tanstack/react-query'
import { fetchMetricasDashboard } from '@/api/dashboard'

export const dashboardMetricsQueryKey = ['dashboard-metrics'] as const

export function useDashboardMetrics() {
  return useQuery({
    queryKey: dashboardMetricsQueryKey,
    queryFn: fetchMetricasDashboard,
  })
}
