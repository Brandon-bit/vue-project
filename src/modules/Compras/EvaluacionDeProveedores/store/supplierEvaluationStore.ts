import { defineStore } from 'pinia'
import type { SupplierEvaluationType } from '@/modules/Compras/EvaluacionDeProveedores/types/supplierEvaluationTypes'

const useSupplierEvaluationStore = defineStore('supplier-evaluation-store', {
    state: () => ({
        selectedSupplier: null as SupplierEvaluationType | null,
        modalId: 'supplier-evaluation-modal'
    }),
    actions: {
        setSelectedSupplier(supplier: SupplierEvaluationType | null) {
            this.selectedSupplier = supplier
        }
    }
})

export default useSupplierEvaluationStore
