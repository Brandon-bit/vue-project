import type { BSCObjective, KeyInitiative, StrategicProject, FinancialKPI, ActiveRisk } from '../types/dashboardTypes'

// Mock service - replace with actual API calls
export const dashboardService = {
    async getBSCObjectives(): Promise<BSCObjective[]> {
        console.log('Fetching BSC Objectives')
        return [
            { name: 'Incrementar rentabilidad', perspective: 'Financiera', progress: 75, status: 'medium' },
            { name: 'Satisfacción del cliente', perspective: 'Clientes', progress: 68, status: 'medium' },
            { name: 'Eficiencia operativa', perspective: 'Procesos', progress: 88, status: 'high' },
            { name: 'Desarrollo de talento', perspective: 'Aprendizaje', progress: 72, status: 'medium' }
        ]
    },

    async getKeyInitiatives(): Promise<KeyInitiative[]> {
        console.log('Fetching Key Initiatives')
        return [
            { name: 'Transformación Digital', progress: 35, budget: '$2.5M', status: 'en-curso' },
            { name: 'Excelencia en Servicio', progress: 48, budget: '$1.2M', status: 'en-curso' },
            { name: 'Optimización de Costos', progress: 72, budget: '$500K', status: 'en-curso' }
        ]
    },

    async getStrategicProjects(): Promise<StrategicProject[]> {
        console.log('Fetching Strategic Projects')
        return [
            { name: 'ERP Integrado', progress: 45, responsible: 'Ana García', status: 'on-track' },
            { name: 'Campaña Digital 2025', progress: 62, responsible: 'Carlos Mendoza', status: 'on-track' },
            { name: 'Automatización RPA', progress: 28, responsible: 'María López', status: 'at-risk' },
            { name: 'Plataforma e-learning', progress: 55, responsible: 'Roberto Silva', status: 'on-track' }
        ]
    },

    async getFinancialKPIs(): Promise<FinancialKPI[]> {
        console.log('Fetching Financial KPIs')
        return [
            { name: 'Margen EBITDA', current: 22, target: 25, unit: '%' },
            { name: 'ROI', current: 18, target: 20, unit: '%' },
            { name: 'Costos/Ingresos', current: 68, target: 60, unit: '%' }
        ]
    },

    async getActiveRisks(): Promise<ActiveRisk[]> {
        console.log('Fetching Active Risks')
        return [
            { name: 'Cadena de suministro', severity: 'high', probability: 7, impact: 9 },
            { name: 'Ciberseguridad', severity: 'high', probability: 8, impact: 8 },
            { name: 'Rotación de personal', severity: 'medium', probability: 5, impact: 7 }
        ]
    },

    async getDashboardData() {
        console.log('Fetching All Dashboard Data')
        const [bscObjectives, keyInitiatives, strategicProjects, financialKPIs, activeRisks] = await Promise.all([
            this.getBSCObjectives(),
            this.getKeyInitiatives(),
            this.getStrategicProjects(),
            this.getFinancialKPIs(),
            this.getActiveRisks()
        ])

        return {
            bscObjectives,
            keyInitiatives,
            strategicProjects,
            financialKPIs,
            activeRisks
        }
    }
}
