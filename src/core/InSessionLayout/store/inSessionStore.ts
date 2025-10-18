import { defineStore } from 'pinia'
import { DashboardType, ModuleType } from '../types/inSessionTypes'

const inSessionStore = defineStore('in-session-store', {
    state: () => ({
        modules: [] as ModuleType[],
        dashboards: [] as DashboardType[],
    })
})

export default inSessionStore