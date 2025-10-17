import { defineStore } from 'pinia'
import { VacationDTO } from '@rrhh/Vacaciones/types/vacationTypes'

const initialVacation: VacationDTO = {
    id: undefined,
    employeeId: 0,
    employeeName: '',
    startDate: '',
    endDate: '',
    comments: '',
    status: 'pending',
    requestDate: '',
    statusLabel: 'Pendiente',
    daysCount: 0
}

const useVacationStore = defineStore('vacation-store', {
    state: () => ({
        vacations: [] as VacationDTO[],
        selectedVacation: null as VacationDTO | null,
        modalId: 'vacation-modal'
    }),
    actions: {
        setData(data: VacationDTO = initialVacation) {
            this.selectedVacation = { ...data }
        },
        clearData() {
            this.selectedVacation = null
        }
    }
})

export default useVacationStore
