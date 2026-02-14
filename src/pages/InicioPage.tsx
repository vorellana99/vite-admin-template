import { Link } from 'react-router-dom'
import { useDashboardMetrics } from '@/hooks/useDashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { List, Users, DollarSign, AlertCircle } from 'lucide-react'

export function InicioPage() {
  const { data: metricas, isLoading, error } = useDashboardMetrics()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Inicio
        </h1>
        <p className="text-muted-foreground">
          Dashboard general del edificio
        </p>
      </div>

      <h2 className="sr-only">Métricas del mes</h2>
      {error && (
        <p className="text-sm text-destructive">
          Error al cargar métricas. Intenta de nuevo.
        </p>
      )}

      <div className="grid min-h-[140px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="space-y-0 pb-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-20 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : metricas ? (
          <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gastos del mes
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                ${metricas.gastosMes.toLocaleString('es-CL')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Departamentos ocupados
              </CardTitle>
              <List className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {metricas.departamentosOcupados} / {metricas.departamentosTotal}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Incidencias abiertas
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metricas.incidenciasAbiertas}</p>
            </CardContent>
          </Card>
          </>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold leading-none tracking-tight">Accesos rápidos</h2>
          <p className="text-sm text-muted-foreground">
            Ir a listas de departamentos u ocupantes
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="default">
            <Link to="/departamentos" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Lista de departamentos
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/departamentos/ocupantes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Lista de ocupantes
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
