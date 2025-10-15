const useJournalBooks = () => {
    const getTypeBadgeVariant = (type: string): string => {
        const variants: Record<string, string> = {
            'Ingreso': 'badge-success',
            'Egreso': 'badge-error',
            'Diario': 'badge-secondary'
        }
        return variants[type] || 'badge-ghost'
    }

    const getMonthName = (monthNumber: string): string => {
        const months: Record<string, string> = {
            '01': 'Enero',
            '02': 'Febrero',
            '03': 'Marzo',
            '04': 'Abril',
            '05': 'Mayo',
            '06': 'Junio',
            '07': 'Julio',
            '08': 'Agosto',
            '09': 'Septiembre',
            '10': 'Octubre',
            '11': 'Noviembre',
            '12': 'Diciembre'
        }
        return months[monthNumber] || ''
    }

    const formatCurrency = (amount: number): string => {
        return amount > 0 
            ? `$${amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
            : '-'
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-MX')
    }

    return {
        getTypeBadgeVariant,
        getMonthName,
        formatCurrency,
        formatDate
    }
}

export default useJournalBooks
