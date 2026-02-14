import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createOcupante,
  fetchOcupantes,
  updateOcupante,
} from '@/api/ocupantes'
import type { OcupanteFormValues } from '@/schemas'

export const ocupantesQueryKey = ['ocupantes'] as const

export function useOcupantes() {
  return useQuery({
    queryKey: ocupantesQueryKey,
    queryFn: fetchOcupantes,
  })
}

export function useCreateOcupante() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (values: OcupanteFormValues) => createOcupante(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ocupantesQueryKey })
      qc.invalidateQueries({ queryKey: ['departamentos'] })
    },
  })
}

export function useUpdateOcupante() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: OcupanteFormValues }) =>
      updateOcupante(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ocupantesQueryKey })
      qc.invalidateQueries({ queryKey: ['departamentos'] })
    },
  })
}
