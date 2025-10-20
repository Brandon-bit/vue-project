/**
 * Get status color class for BSC objectives
 */
export const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
        'high': 'bg-success',
        'medium': 'bg-warning',
        'low': 'bg-error'
    }
    return colors[status] || 'bg-base-300'
}

/**
 * Get project status color class
 */
export const getProjectStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
        'on-track': 'text-success',
        'at-risk': 'text-warning',
        'delayed': 'text-error'
    }
    return colors[status] || 'text-base-content/60'
}

/**
 * Get project status label
 */
export const getProjectStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
        'on-track': 'On Track',
        'at-risk': 'At Risk',
        'delayed': 'Delayed'
    }
    return labels[status] || status
}

/**
 * Get severity badge class for risks
 */
export const getSeverityBadgeClass = (severity: string): string => {
    const classes: Record<string, string> = {
        'high': 'badge-error',
        'medium': 'badge-ghost',
        'low': 'badge-ghost'
    }
    return classes[severity] || 'badge-ghost'
}

/**
 * Get severity label
 */
export const getSeverityLabel = (severity: string): string => {
    const labels: Record<string, string> = {
        'high': 'ALTA',
        'medium': 'MEDIA',
        'low': 'BAJA'
    }
    return labels[severity] || severity.toUpperCase()
}

/**
 * Calculate KPI progress percentage
 */
export const getKPIProgress = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100)
}

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0
    }).format(amount)
}

/**
 * Format percentage
 */
export const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`
}

/**
 * Get gradient class for stat cards
 */
export const getGradientClass = (type: 'success' | 'info' | 'secondary' | 'error'): string => {
    const gradients: Record<string, string> = {
        'success': 'bg-gradient-to-br from-success/10 to-success/5 border-success/20',
        'info': 'bg-gradient-to-br from-info/10 to-info/5 border-info/20',
        'secondary': 'bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20',
        'error': 'bg-gradient-to-br from-error/10 to-error/5 border-error/20'
    }
    return gradients[type] || ''
}
