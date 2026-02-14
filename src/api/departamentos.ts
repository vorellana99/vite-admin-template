import type { Departamento, DepartamentoFormValues } from '@/schemas'

const MOCK_DEPARTAMENTOS: Departamento[] = [
  { id: '1', piso: '1', numero: '101', estado: 'ocupado', ocupanteId: '1' },
  { id: '2', piso: '1', numero: '102', estado: 'disponible', ocupanteId: null },
  { id: '3', piso: '2', numero: '201', estado: 'ocupado', ocupanteId: '2' },
  { id: '4', piso: '2', numero: '202', estado: 'mantenimiento', ocupanteId: null },
]

let data = [...MOCK_DEPARTAMENTOS]

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchDepartamentos(): Promise<Departamento[]> {
  await delay(300)
  return [...data]
}

export async function createDepartamento(
  values: DepartamentoFormValues
): Promise<Departamento> {
  await delay(200)
  const nuevo: Departamento = {
    id: crypto.randomUUID(),
    piso: values.piso,
    numero: values.numero,
    estado: values.estado ?? 'disponible',
    ocupanteId: values.ocupanteId ?? null,
  }
  data.push(nuevo)
  return nuevo
}

export async function updateDepartamento(
  id: string,
  values: DepartamentoFormValues
): Promise<Departamento> {
  await delay(200)
  const idx = data.findIndex((d) => d.id === id)
  if (idx === -1) throw new Error('Departamento no encontrado')
  data[idx] = {
    ...data[idx],
    ...values,
    id: data[idx].id,
    ocupanteId: values.ocupanteId ?? data[idx].ocupanteId,
  }
  return data[idx]
}

export async function deleteDepartamento(id: string): Promise<void> {
  await delay(200)
  data = data.filter((d) => d.id !== id)
}
