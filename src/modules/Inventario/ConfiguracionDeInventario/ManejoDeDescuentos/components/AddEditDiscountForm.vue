<template>
    <form @submit.prevent class="space-y-4">
        <!-- Información Básica -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Nombre del Descuento *</span>
                </label>
                <input 
                    v-model="name" 
                    type="text" 
                    placeholder="Ej: Descuento Black Friday" 
                    class="input input-bordered w-full" 
                    :class="{ 'input-error': nameError }"
                />
                <label v-if="nameError" class="label">
                    <span class="label-text-alt text-error">{{ nameError }}</span>
                </label>
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Tipo de Descuento *</span>
                </label>
                <select 
                    v-model="type" 
                    class="select select-bordered w-full"
                    :class="{ 'select-error': typeError }"
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="PERCENTAGE">Porcentaje (%)</option>
                    <option value="FIXED_AMOUNT">Monto Fijo ($)</option>
                    <option value="VOLUME">Por Volumen</option>
                    <option value="MIN_QUANTITY">Cantidad Mínima</option>
                    <option value="MIN_AMOUNT">Monto Mínimo</option>
                </select>
                <label v-if="typeError" class="label">
                    <span class="label-text-alt text-error">{{ typeError }}</span>
                </label>
            </div>
        </div>

        <!-- Descripción -->
        <div class="form-control">
            <label class="label">
                <span class="label-text">Descripción</span>
            </label>
            <textarea 
                v-model="description" 
                class="textarea textarea-bordered" 
                placeholder="Descripción del descuento"
                :class="{ 'textarea-error': descriptionError }"
            ></textarea>
            <label v-if="descriptionError" class="label">
                <span class="label-text-alt text-error">{{ descriptionError }}</span>
            </label>
        </div>

        <!-- Valor y Configuraciones -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">
                        Valor {{ type === 'PERCENTAGE' ? '(%)' : '($)' }} *
                    </span>
                </label>
                <input 
                    v-model.number="value" 
                    type="number" 
                    :placeholder="type === 'PERCENTAGE' ? 'Ej: 15' : 'Ej: 50'"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': valueError }"
                    step="0.01"
                />
                <label v-if="valueError" class="label">
                    <span class="label-text-alt text-error">{{ valueError }}</span>
                </label>
            </div>

            <div v-if="type === 'MIN_QUANTITY'" class="form-control">
                <label class="label">
                    <span class="label-text">Cantidad Mínima *</span>
                </label>
                <input 
                    v-model.number="minQuantity" 
                    type="number" 
                    placeholder="Ej: 5"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': minQuantityError }"
                />
                <label v-if="minQuantityError" class="label">
                    <span class="label-text-alt text-error">{{ minQuantityError }}</span>
                </label>
            </div>

            <div v-if="type === 'MIN_AMOUNT'" class="form-control">
                <label class="label">
                    <span class="label-text">Monto Mínimo *</span>
                </label>
                <input 
                    v-model.number="minAmount" 
                    type="number" 
                    placeholder="Ej: 100"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': minAmountError }"
                    step="0.01"
                />
                <label v-if="minAmountError" class="label">
                    <span class="label-text-alt text-error">{{ minAmountError }}</span>
                </label>
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Máximo de Usos</span>
                </label>
                <input 
                    v-model.number="maxUses" 
                    type="number" 
                    placeholder="Ilimitado si está vacío"
                    class="input input-bordered w-full"
                />
            </div>
        </div>

        <!-- Fechas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Fecha de Inicio *</span>
                </label>
                <input 
                    v-model="startDate" 
                    type="datetime-local" 
                    class="input input-bordered w-full"
                    :class="{ 'input-error': startDateError }"
                />
                <label v-if="startDateError" class="label">
                    <span class="label-text-alt text-error">{{ startDateError }}</span>
                </label>
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Fecha de Fin *</span>
                </label>
                <input 
                    v-model="endDate" 
                    type="datetime-local" 
                    class="input input-bordered w-full"
                    :class="{ 'input-error': endDateError }"
                />
                <label v-if="endDateError" class="label">
                    <span class="label-text-alt text-error">{{ endDateError }}</span>
                </label>
            </div>
        </div>

        <!-- Configuraciones Adicionales -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Código de Cupón</span>
                </label>
                <input 
                    v-model="couponCode" 
                    type="text" 
                    placeholder="Opcional: BLACKFRIDAY2024"
                    class="input input-bordered w-full"
                />
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Estado</span>
                </label>
                <select v-model="status" class="select select-bordered w-full">
                    <option value="ACTIVE">Activo</option>
                    <option value="INACTIVE">Inactivo</option>
                </select>
            </div>
        </div>

        <!-- Aplicación del Descuento -->
        <div class="form-control">
            <label class="label">
                <span class="label-text">Aplicar a:</span>
            </label>
            <select v-model="applicationType" class="select select-bordered w-full">
                <option value="ALL_PRODUCTS">Todos los productos</option>
                <option value="SPECIFIC_PRODUCTS">Productos específicos</option>
                <option value="CATEGORIES">Categorías específicas</option>
                <option value="BRANDS">Marcas específicas</option>
            </select>
        </div>

        <!-- Toggles -->
        <div class="flex flex-wrap gap-6">
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text mr-4">Se puede combinar con otros descuentos</span>
                    <input v-model="canCombine" type="checkbox" class="toggle toggle-primary" />
                </label>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text mr-4">Descuento activo</span>
                    <input v-model="active" type="checkbox" class="toggle toggle-primary" />
                </label>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import useDiscountStore from '../store/discount.store'
import { computed } from 'vue'

const discountStore = useDiscountStore()

// Form fields usando vee-validate
const { value: name, errorMessage: nameError } = useField('name')
const { value: description, errorMessage: descriptionError } = useField('description')
const { value: type, errorMessage: typeError } = useField('type')
const { value: value, errorMessage: valueError } = useField('value')
const { value: minQuantity, errorMessage: minQuantityError } = useField('minQuantity')
const { value: minAmount, errorMessage: minAmountError } = useField('minAmount')
const { value: maxUses } = useField('maxUses')
const { value: couponCode } = useField('couponCode')
const { value: startDate, errorMessage: startDateError } = useField('startDate')
const { value: endDate, errorMessage: endDateError } = useField('endDate')
const { value: status } = useField('status')
const { value: applicationType } = useField('applicationType')
const { value: canCombine } = useField('canCombine')
const { value: active } = useField('active')
</script>
