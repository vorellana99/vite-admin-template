import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createDepartamento,
  fetchDepartamentos,
  updateDepartamento,
} from '@/api/departamentos'
import type { DepartamentoFormValues } from '@/schemas'

export const departamentosQueryKey = ['departamentos'] as const

export function useDepartamentos() {
  return useQuery({
    queryKey: departamentosQueryKey,
    queryFn: fetchDepartamentos,
  })
}

export function useCreateDepartamento() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (values: DepartamentoFormValues) => createDepartamento(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: departamentosQueryKey })
      qc.invalidateQueries({ queryKey: ['dashboard-metrics'] })
    },
  })
}

export function useUpdateDepartamento() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: DepartamentoFormValues }) =>
      updateDepartamento(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: departamentosQueryKey })
      qc.invalidateQueries({ queryKey: ['dashboard-metrics'] })
      qc.invalidateQueries({ queryKey: ['ocupantes'] })
    },
  })
}
