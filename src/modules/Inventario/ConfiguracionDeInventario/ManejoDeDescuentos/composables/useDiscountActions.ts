import { useModalStore } from '@/shared/stores/modal.store'
import useDiscountStore from '../store/discount.store'
import { createDiscountService, updateDiscountService, deleteDiscountService } from '../services/discountServices'
import type { CreateDiscountPayload, UpdateDiscountPayload, Discount } from '../types/discountTypes'

export const useDiscountActions = () => {
    const modalStore = useModalStore()
    const discountStore = useDiscountStore()

    const createDiscount = async (discountData: CreateDiscountPayload) => {
        try {
            const newDiscount = await createDiscountService(discountData)
            discountStore.discounts.push(newDiscount)
            modalStore.close(discountStore.modalId)
            return {
                success: true,
                message: 'Descuento creado exitosamente',
                data: newDiscount
            }
        } catch (error) {
            console.error('Error creating discount:', error)
            return {
                success: false,
                message: 'Error al crear el descuento',
                error
            }
        }
    }

    const updateDiscount = async (discountData: UpdateDiscountPayload) => {
        try {
            const updatedDiscount = await updateDiscountService(discountData)
            const index = discountStore.discounts.findIndex(d => d.id === discountData.id)
            if (index !== -1) {
                discountStore.discounts[index] = updatedDiscount
            }
            modalStore.close(discountStore.modalId)
            return {
                success: true,
                message: 'Descuento actualizado exitosamente',
                data: updatedDiscount
            }
        } catch (error) {
            console.error('Error updating discount:', error)
            return {
                success: false,
                message: 'Error al actualizar el descuento',
                error
            }
        }
    }

    const deleteDiscount = async (discountData: { id: number }) => {
        try {
            await deleteDiscountService(discountData.id)
            discountStore.discounts = discountStore.discounts.filter(d => d.id !== discountData.id)
            modalStore.close(discountStore.modalId)
            return {
                success: true,
                message: 'Descuento eliminado exitosamente'
            }
        } catch (error) {
            console.error('Error deleting discount:', error)
            return {
                success: false,
                message: 'Error al eliminar el descuento',
                error
            }
        }
    }

    const openEditModal = (discount: Discount) => {
        discountStore.setData(discount)
        modalStore.open(discountStore.modalId, { 
            type: 'EDIT', 
            title: 'Editar Descuento' 
        })
    }

    const openDeleteModal = (discount: Discount) => {
        discountStore.setData(discount)
        modalStore.open(discountStore.modalId, { 
            type: 'DELETE', 
            title: 'Eliminar Descuento' 
        })
    }

    const openCreateModal = () => {
        discountStore.setData()
        modalStore.open(discountStore.modalId, { 
            type: 'CREATE', 
            title: 'Crear Descuento' 
        })
    }

    return {
        createDiscount,
        updateDiscount,
        deleteDiscount,
        openEditModal,
        openDeleteModal,
        openCreateModal
    }
}
