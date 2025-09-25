import { OrdersType } from "../types/posOrdersType";
import { defineStore } from 'pinia'

const initialOrders : OrdersType = {
    id: undefined,
    name: "",
    reference: "",
    sale_date: "" ,// O puedes usar el tipo Date
    status: "",
    grand_total: 0,
    paid: 0,
    due: 0,
    payment_status: "",
    biller_name: "",
}

const useOrdersStore = defineStore('orders-store', {
    state: () => ({
            sales: [] as OrdersType[],
            selectedSale: null as OrdersType | null,
            modalId: 'orders-modal'
        }),
        actions: {
                setData(data: OrdersType = initialOrders) {
                    this.selectedSale = data
                }
            }
        })

export default useOrdersStore