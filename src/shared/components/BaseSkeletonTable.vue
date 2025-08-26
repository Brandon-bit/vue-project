<script setup lang="ts">
</script>

<template>
    <div
        class="rounded-box border border-base-content/5 bg-base-100 my-5 w-full max-w-[100vw] overflow-hidden"
    >
        <table class="table w-full">
            <thead>
                <tr>
                    <th>
                        <div class="skeleton h-4 w-10"></div>
                    </th>
                    <th>
                        <div class="skeleton h-4 w-30"></div>
                    </th>
                    <th>
                        <div class="skeleton h-4 w-30"></div>
                    </th>
                    <th>
                        <div class="skeleton h-4 w-30"></div>
                    </th>
                    <th>
                        <div class="skeleton h-4 w-20"></div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in 6" :key="n">
                    <td>
                        <div class="skeleton h-4 w-10"></div>
                    </td>
                    <td>
                        <div class="skeleton h-4 w-30"></div>
                    </td>
                    <td>
                        <div class="skeleton h-4 w-30"></div>
                    </td>
                    <td>
                        <div class="skeleton h-4 w-30"></div>
                    </td>
                    <td>
                        <div class="skeleton h-8 w-20 rounded-md"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>