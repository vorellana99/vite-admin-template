import type { Ocupante, OcupanteFormValues } from '@/schemas'

const MOCK_OCUPANTES: Ocupante[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '+56 9 1234 5678',
    departamentoId: '1',
  },
  {
    id: '2',
    nombre: 'María López',
    email: 'maria@example.com',
    telefono: '',
    departamentoId: '3',
  },
]

let data = [...MOCK_OCUPANTES]

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchOcupantes(): Promise<Ocupante[]> {
  await delay(300)
  return [...data]
}

export async function createOcupante(
  values: OcupanteFormValues
): Promise<Ocupante> {
  await delay(200)
  const nuevo: Ocupante = {
    id: crypto.randomUUID(),
    nombre: values.nombre,
    email: values.email,
    telefono: values.telefono ?? undefined,
    departamentoId: values.departamentoId ?? null,
  }
  data.push(nuevo)
  return nuevo
}

export async function updateOcupante(
  id: string,
  values: OcupanteFormValues
): Promise<Ocupante> {
  await delay(200)
  const idx = data.findIndex((o) => o.id === id)
  if (idx === -1) throw new Error('Ocupante no encontrado')
  data[idx] = {
    ...data[idx],
    ...values,
    id: data[idx].id,
    departamentoId: values.departamentoId ?? data[idx].departamentoId,
  }
  return data[idx]
}
