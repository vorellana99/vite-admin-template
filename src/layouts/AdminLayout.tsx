import { Outlet, NavLink, useMatch } from 'react-router-dom'
import { Home, Building2, List, Users, Menu, ChevronDown } from 'lucide-react'
import { useUIStore } from '@/stores/ui'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

function SidebarInner() {
  const departamentosSubmenuOpen = useUIStore((s) => s.departamentosSubmenuOpen)
  const toggleDepartamentosSubmenu = useUIStore(
    (s) => s.toggleDepartamentosSubmenu
  )
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)
  const onDepartamentos = useMatch('/departamentos/*')

  return (
    <nav className="flex flex-col gap-1 p-3">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )
        }
        onClick={() => setSidebarOpen(false)}
      >
        <Home className="h-5 w-5 shrink-0" aria-hidden />
        <span>1. Inicio</span>
      </NavLink>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={toggleDepartamentosSubmenu}
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left',
            onDepartamentos
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
          aria-expanded={departamentosSubmenuOpen}
        >
          <span className="flex items-center gap-3">
            <Building2 className="h-5 w-5 shrink-0" aria-hidden />
            <span>2. Departamentos</span>
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 transition-transform',
              departamentosSubmenuOpen && 'rotate-180'
            )}
          />
        </button>
        {departamentosSubmenuOpen && (
          <div className="ml-6 flex flex-col gap-0.5 border-l border-border pl-2">
            <NavLink
              to="/departamentos"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
              onClick={() => setSidebarOpen(false)}
            >
              <List className="h-4 w-4" aria-hidden />
              Lista de departamentos
            </NavLink>
            <NavLink
              to="/departamentos/ocupantes"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Users className="h-4 w-4" aria-hidden />
              Lista de ocupantes
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export function AdminLayout() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside
        className="hidden w-64 shrink-0 border-r border-border bg-card md:block"
        aria-label="Menú principal"
      >
        <div className="flex h-16 items-center border-b border-border px-4">
          <span className="font-semibold text-primary">Admin Edificios</span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <SidebarInner />
        </ScrollArea>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-card px-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-primary">Admin Edificios</span>
        </header>

        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0" aria-describedby="sidebar-nav-desc">
            <SheetHeader className="flex h-16 flex-row items-center border-b border-border px-4 text-left">
              <SheetTitle className="font-semibold text-primary">Menú</SheetTitle>
            </SheetHeader>
            <p id="sidebar-nav-desc" className="sr-only">Navegación principal: Inicio y Departamentos</p>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <SidebarInner />
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <main className="flex-1 min-h-[50vh] p-4 md:p-6" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
