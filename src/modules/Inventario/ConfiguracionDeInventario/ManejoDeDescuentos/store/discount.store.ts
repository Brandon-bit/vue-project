import { defineStore } from 'pinia'
import type { Discount, DiscountStatus, DiscountType } from '../types/discountTypes'

const useDiscountStore = defineStore('discount-store', {
    state: () => ({
        discounts: [] as Discount[],
        selectedDiscount: {} as Discount,
        modalId: 'discount-modal',
        filters: {
            searchTerm: '',
            type: '' as DiscountType | '',
            status: '' as DiscountStatus | '',
            startDate: null as Date | null,
            endDate: null as Date | null
        }
    }),
    getters: {
        filteredDiscounts: (state) => {
            return state.discounts.filter(discount => {
                const matchesSearch = !state.filters.searchTerm || 
                    discount.name.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
                    (discount.description && discount.description.toLowerCase().includes(state.filters.searchTerm.toLowerCase()))
                
                const matchesType = !state.filters.type || discount.type === state.filters.type
                const matchesStatus = !state.filters.status || discount.status === state.filters.status
                
                const matchesStartDate = !state.filters.startDate || 
                    new Date(discount.startDate) >= state.filters.startDate
                
                const matchesEndDate = !state.filters.endDate || 
                    new Date(discount.endDate) <= state.filters.endDate

                return matchesSearch && matchesType && matchesStatus && matchesStartDate && matchesEndDate
            })
        },
        activeDiscounts: (state) => {
            const now = new Date()
            return state.discounts.filter(discount => 
                discount.active && 
                discount.status === 'ACTIVE' &&
                new Date(discount.startDate) <= now &&
                new Date(discount.endDate) >= now
            )
        }
    },
    actions: {
        setData(discount: Partial<Discount> = {}) {
            this.selectedDiscount = {
                name: '',
                description: '',
                type: 'PERCENTAGE' as DiscountType,
                value: 0,
                startDate: new Date(),
                endDate: new Date(),
                status: 'ACTIVE' as DiscountStatus,
                applicationType: 'ALL_PRODUCTS',
                canCombine: false,
                active: true,
                creationDate: new Date(),
                ...discount
            } as Discount
        },
        updateFilters(newFilters: Partial<typeof this.filters>) {
            this.filters = { ...this.filters, ...newFilters }
        },
        clearFilters() {
            this.filters = {
                searchTerm: '',
                type: '' as DiscountType | '',
                status: '' as DiscountStatus | '',
                startDate: null,
                endDate: null
            }
        }
    }
})

export default useDiscountStore
