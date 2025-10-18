<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import AccountCatalogModal from '@/modules/Contabilidad/CatalogoDeCuentas/components/AccountCatalogModal.vue'
import useAccountCatalog from '@/modules/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalog'
import useAccountsCatalogStore from '@/modules/Contabilidad/CatalogoDeCuentas/store/accountsCatalogStore'
import { useAccountCatalogActions } from '@/modules/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'
import type { AccountType } from '@/modules/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { openEditModal, openDeleteModal, getTypeVariant, getNatureVariant } = useAccountCatalog()
const { getAccountsCatalog } = useAccountCatalogActions()

const accountsCatalogStore = useAccountsCatalogStore()
const modalStore = useModalStore()

const accounts = ref<AccountType[]>([])
const expandedRows = ref<Set<string>>(new Set(['1', '2', '3', '1-1', '2-1']))
const searchTerm = ref('')
const loading = ref(true)

const openCreateModal = () => {
    accountsCatalogStore.setData()
    modalStore.open(accountsCatalogStore.modalId, { type: 'CREATE', title: 'Crear cuenta' })
}

const toggleRow = (id: string) => {
    const newSet = new Set(expandedRows.value)
    if (newSet.has(id)) {
        newSet.delete(id)
    } else {
        newSet.add(id)
    }
    expandedRows.value = newSet
}

const fetchAccounts = async () => {
    loading.value = true
    try {
        accounts.value = await getAccountsCatalog()
    } catch (error) {
        console.error('Error fetching accounts:', error)
    } finally {
        loading.value = false
    }
}

const filteredAccounts = computed(() => {
    if (!searchTerm.value) return accounts.value
    
    const search = searchTerm.value.toLowerCase()
    
    const filterAccounts = (accountsList: AccountType[]): AccountType[] => {
        return accountsList.filter(account => {
            const matches = 
                account.code.toLowerCase().includes(search) ||
                account.name.toLowerCase().includes(search)
            
            if (matches) return true
            
            if (account.subaccounts && account.subaccounts.length > 0) {
                const filteredSubs = filterAccounts(account.subaccounts)
                return filteredSubs.length > 0
            }
            
            return false
        }).map(account => {
            if (account.subaccounts && account.subaccounts.length > 0) {
                return {
                    ...account,
                    subaccounts: filterAccounts(account.subaccounts)
                }
            }
            return account
        })
    }
    
    return filterAccounts(accounts.value)
})

onMounted(() => {
    fetchAccounts()
})
</script>

<template>
    <BaseTitle title="Catálogo de Cuentas" subtitle="Registro y gestión de cuentas contables" />

    <div class="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="w-full md:w-96">
            <label class="input input-bordered flex items-center gap-2">
                <input 
                    v-model="searchTerm" 
                    type="text" 
                    class="grow" 
                    placeholder="Buscar por código o nombre..." 
                />
                <span class="material-symbols-outlined">search</span>
            </label>
        </div>
        <BaseButton text="Agregar Cuenta" @click="openCreateModal" icon="add" />
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else class="rounded-box border border-base-content/5 bg-base-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="table">
                <thead class="bg-base-300">
                    <tr>
                        <th class="w-[200px]">Código</th>
                        <th>Nombre</th>
                        <th class="w-[150px]">Tipo</th>
                        <th class="w-[150px]">Naturaleza</th>
                        <th class="text-right w-[180px]">Saldo Actual</th>
                        <th class="w-[120px] text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="account in filteredAccounts" :key="account.id">
                        <tr class="hover:bg-base-200">
                            <td class="font-medium">
                                <div class="flex items-center gap-2">
                                    <button
                                        v-if="account.subaccounts && account.subaccounts.length > 0"
                                        @click="toggleRow(account.id!)"
                                        class="btn btn-ghost btn-xs"
                                    >
                                        <span class="material-symbols-outlined text-base">
                                            {{ expandedRows.has(account.id!) ? 'expand_more' : 'chevron_right' }}
                                        </span>
                                    </button>
                                    <span v-else class="w-8"></span>
                                    <span>{{ account.code }}</span>
                                </div>
                            </td>
                            <td>
                                <span class="font-semibold">{{ account.name }}</span>
                            </td>
                            <td>
                                <span class="badge" :class="getTypeVariant(account.type)">
                                    {{ account.type }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="getNatureVariant(account.nature)">
                                    {{ account.nature }}
                                </span>
                            </td>
                            <td class="text-right font-mono">
                                ${{ account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                            </td>
                            <td>
                                <div class="flex gap-2 justify-center">
                                    <button
                                        @click="openEditModal(account)"
                                        class="btn btn-ghost btn-sm"
                                        title="Editar"
                                    >
                                        <span class="material-symbols-outlined">edit</span>
                                    </button>
                                    <button
                                        @click="openDeleteModal(account)"
                                        class="btn btn-ghost btn-sm text-error"
                                        title="Eliminar"
                                    >
                                        <span class="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <!-- Level 2 subaccounts -->
                        <template v-if="account.subaccounts && expandedRows.has(account.id!)">
                            <template v-for="subaccount in account.subaccounts" :key="subaccount.id">
                                <tr class="hover:bg-base-200">
                                    <td class="font-medium" style="padding-left: 3rem">
                                        <div class="flex items-center gap-2">
                                            <button
                                                v-if="subaccount.subaccounts && subaccount.subaccounts.length > 0"
                                                @click="toggleRow(subaccount.id!)"
                                                class="btn btn-ghost btn-xs"
                                            >
                                                <span class="material-symbols-outlined text-base">
                                                    {{ expandedRows.has(subaccount.id!) ? 'expand_more' : 'chevron_right' }}
                                                </span>
                                            </button>
                                            <span v-else class="w-8"></span>
                                            <span>{{ subaccount.code }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="font-medium">{{ subaccount.name }}</span>
                                    </td>
                                    <td>
                                        <span class="badge" :class="getTypeVariant(subaccount.type)">
                                            {{ subaccount.type }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge" :class="getNatureVariant(subaccount.nature)">
                                            {{ subaccount.nature }}
                                        </span>
                                    </td>
                                    <td class="text-right font-mono">
                                        ${{ subaccount.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                    </td>
                                    <td>
                                        <div class="flex gap-2 justify-center">
                                            <button
                                                @click="openEditModal(subaccount)"
                                                class="btn btn-ghost btn-sm"
                                                title="Editar"
                                            >
                                                <span class="material-symbols-outlined">edit</span>
                                            </button>
                                            <button
                                                @click="openDeleteModal(subaccount)"
                                                class="btn btn-ghost btn-sm text-error"
                                                title="Eliminar"
                                            >
                                                <span class="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Level 3 subaccounts -->
                                <template v-if="subaccount.subaccounts && expandedRows.has(subaccount.id!)">
                                    <tr 
                                        v-for="subsubaccount in subaccount.subaccounts" 
                                        :key="subsubaccount.id"
                                        class="hover:bg-base-200"
                                    >
                                        <td class="font-medium" style="padding-left: 5rem">
                                            <div class="flex items-center gap-2">
                                                <span class="w-8"></span>
                                                <span>{{ subsubaccount.code }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span>{{ subsubaccount.name }}</span>
                                        </td>
                                        <td>
                                            <span class="badge" :class="getTypeVariant(subsubaccount.type)">
                                                {{ subsubaccount.type }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="badge" :class="getNatureVariant(subsubaccount.nature)">
                                                {{ subsubaccount.nature }}
                                            </span>
                                        </td>
                                        <td class="text-right font-mono">
                                            ${{ subsubaccount.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                        </td>
                                        <td>
                                            <div class="flex gap-2 justify-center">
                                                <button
                                                    @click="openEditModal(subsubaccount)"
                                                    class="btn btn-ghost btn-sm"
                                                    title="Editar"
                                                >
                                                    <span class="material-symbols-outlined">edit</span>
                                                </button>
                                                <button
                                                    @click="openDeleteModal(subsubaccount)"
                                                    class="btn btn-ghost btn-sm text-error"
                                                    title="Eliminar"
                                                >
                                                    <span class="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                        </template>
                    </template>

                    <tr v-if="filteredAccounts.length === 0">
                        <td colspan="6" class="text-center py-8">
                            No se encontraron cuentas
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <AccountCatalogModal :onRefresh="fetchAccounts" />
</template>

<style scoped>
.table tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.02);
}
</style>
