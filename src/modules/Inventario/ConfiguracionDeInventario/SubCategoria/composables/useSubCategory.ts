import { ColumnTableType } from '@/shared/types/columnTableType';

import { h } from 'vue'
import useSubCategoryStore from '../store/subcategory.store';
import {useModalStore} from '@/shared/stores/modal.store'

import { editTableButton, deleteTableButton } from '@/utils/tableButtons';


export const useSubCategory = () =>{

    //activar otros archivos para usarlos para poder guardarlos
    const subCategoryStore = useSubCategoryStore();
    const modalStore = useModalStore();

     const getTableColumns = (): ColumnTableType[] => {
    
    return [
            {
            header: 'Nombre',
            accessorKey: 'label',
            cell: ({row}: any) => {
                const subcat = row.original.label;
                const imageUrl = row.original.imageUrl;

                // 1. Crea el componente del avatar (tu código actual)
                const avatarComponent = h('div', { class: 'avatar' }, [
                    h('div', { class: 'mask mask-squircle w-8 h-8' }, [
                        h('img', {
                            src: imageUrl,
                            alt: subcat,
                            class: 'object-cover w-full h-full'
                        })
                    ])
                ]);

                // 2. Crea el componente para el texto
                const textComponent = h('div', { class: 'font-bold' }, subcat);

                // 3. Devuelve un div 'flex' que contiene a los dos anteriores
                return h('div', { class: 'flex items-center gap-3' }, [
                    avatarComponent,
                    textComponent
                ]);
            }
        },
        {
        header: 'Categoría Padre',
        accessorKey: 'parentCategory'
        },


        {
            header: 'Código',
            accessorKey: 'code'
        },
        {
         header: 'Descripción',
         accessorKey: 'description'
        },
       {
        header: 'Estado',
        accessorKey:'status',
        cell: ({row}: any) => {
            const isActive = row.original.status;
            return isActive
            ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
            : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')  

        }
       },
       {
        header: 'Acciones',
        accessorKey: 'actions',
        cell:({row}: any) =>{
            const data = row.original;
                        const editModal = () => {
                            console.log("AAAAAAAAAA", data);
                subCategoryStore.setData(data); // Guarda esta subcategoría en el store
                modalStore.open(subCategoryStore.modalId, { // Abre el modal
                    type: 'EDIT',
                    title: 'Editar Subcategoría'
                });
            };

            const deleteModal = () => {
                subCategoryStore.setData(data); // Guarda esta subcategoría en el store
                modalStore.open(subCategoryStore.modalId, { // Abre el modal
                    type: 'DELETE',
                    title: 'Eliminar Subcategoría'
                });
            };
            const editButton = editTableButton(editModal);
            const deleteButton = deleteTableButton(deleteModal);

                    return h('div', { class: 'flex gap-4 justify-center' }, [
            editButton,
            deleteButton
        ]);
        }
       }

    
    ];
  };

  return {
    getTableColumns
  };
}

