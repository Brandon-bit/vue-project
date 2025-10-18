import { ColumnTableType } from "@/shared/types/columnTableType"
import { h, withDirectives } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useAuditStore from '../store/auditStore'

export const useAuditTableHeaders = (): ColumnTableType[] => {
    const modalStore = useModalStore()
    const auditStore = useAuditStore()

    const columns = [
        {
            header: 'Auditoría',
            accessorKey: 'nombre'
        },
        {
            header: 'Tipo',
            accessorKey: 'tipo',
            cell: ({ row }: any) => {
                const tipo = row.original.tipo
                return h('span', { class: 'badge badge-outline' }, tipo)
            }
        },
        {
            header: 'Área',
            accessorKey: 'area'
        },
        {
            header: 'Auditor',
            accessorKey: 'auditor'
        },
        {
            header: 'Período',
            accessorKey: 'fechaInicio',
            cell: ({ row }: any) => {
                const inicio = new Date(row.original.fechaInicio).toLocaleDateString('es-MX')
                const fin = new Date(row.original.fechaFin).toLocaleDateString('es-MX')
                return h('span', { class: 'text-sm' }, `${inicio} - ${fin}`)
            }
        },
        {
            header: 'Progreso',
            accessorKey: 'progreso',
            cell: ({ row }: any) => {
                const progreso = row.original.progreso
                return h('div', { class: 'flex items-center gap-2' }, [
                    h('progress', { 
                        class: 'progress progress-primary w-20', 
                        value: progreso, 
                        max: 100 
                    }),
                    h('span', { class: 'text-xs text-base-content/70' }, `${progreso}%`)
                ])
            }
        },
        {
            header: 'Hallazgos',
            accessorKey: 'hallazgos',
            cell: ({ row }: any) => {
                const hallazgos = row.original.hallazgos
                return hallazgos > 0
                    ? h('span', { class: 'badge badge-error' }, hallazgos)
                    : h('span', {}, '-')
            }
        },
        {
            header: 'Estado',
            accessorKey: 'estado',
            cell: ({ row }: any) => {
                const estado = row.original.estado
                const badges: Record<string, { class: string; icon: string }> = {
                    'Planificada': { class: 'badge-outline', icon: 'calendar_month' },
                    'En Ejecución': { class: 'badge-primary', icon: 'play_circle' },
                    'En Revisión': { class: 'badge-secondary', icon: 'description' },
                    'Cerrada': { class: 'badge-success', icon: 'check_circle' }
                }
                const config = badges[estado] || badges['Planificada']
                return h('div', { class: `badge gap-2 ${config.class}` }, [
                    h('span', { class: 'material-symbols-outlined text-sm' }, config.icon),
                    estado
                ])
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                return h('div', { class: 'flex gap-4 justify-center' }, [
                    withDirectives(
                        h(
                            'div',
                            { 
                                class: 'tooltip', 
                                'data-tip': 'Editar' 
                            },
                            [
                                h('button', { 
                                    class: 'btn btn-outline btn-primary action-btn-table',
                                    onClick: () => {
                                        auditStore.setAuditData(data)
                                        modalStore.open(auditStore.auditModalId, {
                                            type: 'EDIT',
                                            title: 'Editar Auditoría'
                                        })
                                    }
                                }, [h('span', { class: 'material-symbols-outlined' }, 'edit_square')])
                            ]
                        ),
                        []
                    ),
                    withDirectives(
                        h(
                            'div',
                            { 
                                class: 'tooltip', 
                                'data-tip': 'Eliminar' 
                            },
                            [
                                h('button', { 
                                    class: 'btn btn-outline btn-error action-btn-table',
                                    onClick: () => {
                                        auditStore.setAuditData(data)
                                        modalStore.open(auditStore.auditModalId, {
                                            type: 'DELETE',
                                            title: 'Eliminar Auditoría'
                                        })
                                    }
                                }, [h('span', { class: 'material-symbols-outlined' }, 'delete')])
                            ]
                        ),
                        []
                    )
                ])
            }
        }
    ]

    return columns
}
