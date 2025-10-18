import { defineStore } from 'pinia'
import type { GastoType } from '@/modules/Administracion/CajaChica/types/gastoTypes'

const initialGasto: GastoType = {
    id: undefined,
    cajaId: 0,
    cajaNombre: '',
    fecha: new Date(),
    concepto: '',
    monto: 0,
    responsable: '',
    centroCosto: '',
    descripcion: '',
    status: 'Pendiente',
    comprobanteUrl: '',
    creationDate: new Date()
}

const useGastoStore = defineStore('gasto-store', {
    state: () => ({
        selectedGasto: initialGasto as GastoType,
        modalId: 'gasto-modal'
    }),
    actions: {
        setData(data: GastoType = initialGasto) {
            this.selectedGasto = data
        }
    }
})

export default useGastoStore
