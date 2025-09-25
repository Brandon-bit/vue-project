import { SaleType } from "../types/saleType";
import { defineStore } from 'pinia'

const initialSale: SaleType = {

    id: undefined,
    name: "",
    reference: "",
    sale_date: "",
    status: "",
    grand_total: 0,
    paid: 0,
    due: 0,
    payment_status: "",
    biller_name: ""
}


const useSaleStore = defineStore('sale-store', {
    state: () => ({
        sales: [] as SaleType[],
        selectedSale: null as SaleType | null,
        modalId: 'sale-modal'
    }),
    actions: {
        setData(data: SaleType = initialSale) {
            this.selectedSale = data
        }
    }
})

export default useSaleStore