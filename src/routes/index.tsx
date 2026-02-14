import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'

const InicioPage = lazy(() => import('@/pages/InicioPage').then((m) => ({ default: m.InicioPage })))
const DepartamentosPage = lazy(() => import('@/pages/DepartamentosPage').then((m) => ({ default: m.DepartamentosPage })))
const OcupantesPage = lazy(() => import('@/pages/OcupantesPage').then((m) => ({ default: m.OcupantesPage })))

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" aria-hidden>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageFallback />}><InicioPage /></Suspense> },
      { path: 'departamentos', element: <Suspense fallback={<PageFallback />}><DepartamentosPage /></Suspense> },
      { path: 'departamentos/ocupantes', element: <Suspense fallback={<PageFallback />}><OcupantesPage /></Suspense> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
