import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  departamentosSubmenuOpen: boolean
  modalDepartamentoOpen: boolean
  modalOcupanteOpen: boolean
  editingDepartamentoId: string | null
  editingOcupanteId: string | null
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setDepartamentosSubmenuOpen: (open: boolean) => void
  toggleDepartamentosSubmenu: () => void
  openDepartamentoModal: (id?: string) => void
  closeDepartamentoModal: () => void
  openOcupanteModal: (id?: string) => void
  closeOcupanteModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  departamentosSubmenuOpen: true,
  modalDepartamentoOpen: false,
  modalOcupanteOpen: false,
  editingDepartamentoId: null,
  editingOcupanteId: null,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setDepartamentosSubmenuOpen: (open) =>
    set({ departamentosSubmenuOpen: open }),
  toggleDepartamentosSubmenu: () =>
    set((s) => ({ departamentosSubmenuOpen: !s.departamentosSubmenuOpen })),
  openDepartamentoModal: (id) =>
    set({
      modalDepartamentoOpen: true,
      editingDepartamentoId: id ?? null,
    }),
  closeDepartamentoModal: () =>
    set({
      modalDepartamentoOpen: false,
      editingDepartamentoId: null,
    }),
  openOcupanteModal: (id) =>
    set({
      modalOcupanteOpen: true,
      editingOcupanteId: id ?? null,
    }),
  closeOcupanteModal: () =>
    set({
      modalOcupanteOpen: false,
      editingOcupanteId: null,
    }),
}))
