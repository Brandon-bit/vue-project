<template>
    <h2>Marcas</h2>

    <BaseTable :data="data" :headers="columns"/>
</template>

<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { ColumnTable } from '@/shared/types/ColumnTable'
import { h  , withDirectives } from 'vue'
import { useBrandActions } from '../composables/useBrandActions'

const columns : ColumnTable[] = [
    {
        header: 'Marca',
        accessorKey: 'Brand',
        cell: ({ row } : any) => {
            const brand = row.original.Brand
            const vnode = h(
                'div',
                { class: 'flex justify-center items-center gap-3' },
                [
                    // avatar
                    h('div', { class: 'avatar' }, [
                    h('div', { class: 'mask mask-squircle h-10 w-10' }, [
                        h('img', {
                        src: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
                        alt: 'Brand image'
                        })
                    ])
                    ]),

                    // texto
                    h('div', {}, [
                    h('div', { class: 'font-bold' }, brand)
                    ])
                ]
            )
            return vnode
        }
    },
    {
        header: 'Fecha de Creación',
        accessorKey: 'CreatedDate'
    },
    {
        header: 'Estado',
        accessorKey: 'Activo',
        cell: ({ row } : any) => {
            const isActive = row.original.Activo    
            return isActive
                ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')
        }
    },
    {
        header: 'Acciones',
        accessorKey: '',
        cell: ({ row } : any) => {
            const data = row.original

            const { showInfo, edit, deleteData } = useBrandActions()

            
            return h('div', { class: 'flex gap-4 justify-center' }, [
                // withDirectives(
                //     h(
                //         'div',
                //         { 
                //             class: 'tooltip', 
                //             'data-tip': 'Más información' 
                //         },
                //         [
                //             h('button', { 
                //             class: 'btn btn-outline btn-info action-btn-table',
                //             onClick: () => showInfo(data)
                //             }, [h('span', { class: 'material-symbols-outlined' }, 'info')])
                //         ]
                //     ),
                //     []
                // ),
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
                            onClick: () => edit(data)
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
                            onClick: () => deleteData(data)
                            }, [h('span', { class: 'material-symbols-outlined' }, 'delete')])
                        ]
                    ),
                    []
                )
            ])
        }
    }
]

const data = [
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: false
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    },
    {
        Brand: 'Lenevo',
        CreatedDate: '25 May 2024',
        Activo: true
    }
]


</script>