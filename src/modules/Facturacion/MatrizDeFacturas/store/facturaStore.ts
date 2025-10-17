import { defineStore } from 'pinia'
import type { FiltrosFacturaType } from '@/modules/Facturacion/MatrizDeFacturas/types/facturaTypes'

const useFacturaStore = defineStore('factura-store', {
    state: () => ({
        modalConfigSATId: 'config-sat-modal',
        filtros: {
            tipo: 'todas' as const,
            estatus: 'todos' as const,
            fechaDesde: '',
            fechaHasta: '',
            busqueda: ''
        } as FiltrosFacturaType
    }),
    actions: {
        setFiltros(filtros: Partial<FiltrosFacturaType>) {
            this.filtros = { ...this.filtros, ...filtros }
        },
        resetFiltros() {
            this.filtros = {
                tipo: 'todas',
                estatus: 'todos',
                fechaDesde: '',
                fechaHasta: '',
                busqueda: ''
            }
        }
    }
})

export default useFacturaStore
