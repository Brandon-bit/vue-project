<script setup lang="ts">
import { ref, computed } from "vue"
import useVariantAttributeStore from '../store/variantAttributeStore'

const props = defineProps<{
    name: string
    label: string
    placeholder?: string
    required?: boolean
    class?: string
}>()

const variantAttributeStore = useVariantAttributeStore()

const items = computed({
    get() {
        return variantAttributeStore.valuesCopy;
    },
    set(newValues: string[]) {
        variantAttributeStore.valuesCopy = newValues;
    }
});

const inputValue = ref("")

function handleKeydown(event: KeyboardEvent) {
    if (event.key === " " && inputValue.value.trim() !== "") {
        event.preventDefault()
        items.value.push(inputValue.value.trim())
        inputValue.value = ""
    }
}

function removeTag(index: number) {
  items.value.splice(index, 1)
}
</script>

<template>
    <label :for="props.name" class="font-semibold">
        {{ props.label }}
        <span v-if="props.required" class="text-error"> *</span>
    </label>
    <div
        class="flex flex-wrap items-center gap-2 border rounded-lg p-2 cursor-text w-full mt-3 input input-tags"
        @click="$refs.inputRef?.focus()"
    >
        <!-- Badges -->
        <span
            v-for="(item, index) in items"
            :key="index"
            class="badge badge-info flex items-center gap-1"
            >
            {{ item }}
            <button
                class="ml-1 flex items-center justify-center text-xs hover:cursor-pointer"
                @click="removeTag(index)"
                type="button"
            >
                <span class="material-symbols-outlined text-gray-400 hover:text-white hover:scale-105 transition duration-200 ">
                    close
                </span>
            </button>
        </span>

        <!-- Input -->
        <input
            ref="inputRef"
            v-model="inputValue"
            @keydown="handleKeydown"
            class="flex-1 outline-none"
            placeholder="Escribe y presiona espacio..."
        />
    </div>
</template>

<style scoped>
.input-tags {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;

  min-height: var(--size);
  height: auto;
  min-width: 100%;
  width: auto;
  white-space: normal;
}
</style>
