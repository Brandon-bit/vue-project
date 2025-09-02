import { ColumnTableType } from '@/shared/types/columnTableType';
import { SubCategory} from '../types/subCategoryType';
import { h } from 'vue'
import useSubCategoryStore from '../store/subcategory.store';
import {useModalStore} from '@/shared/stores/modal.store'


export const useSubCategory = () =>{

    //activar otros archivos para usarlos para poder guardarlos
    const subCategoryStore = useSubCategoryStore();
    const modalStore = useModalStore();

     const getTableColumns = (): ColumnTableType[] => {
    
    return [
       {
        header: 'Nombre',
        accessorKey: 'name'
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
            const editModal= () =>{
                subCategoryStore.setData(data);
                modalStore.open(subCategoryStore.modalId,{
                    type: 'EDIT',
                    title: 'Editar Subcategoría'
                })
            }

        }
       }

    
    ];
  };

  return {
    getTableColumns
  };
}

