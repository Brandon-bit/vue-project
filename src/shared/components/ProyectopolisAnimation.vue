<template>
    <div ref="container" class="lottie-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import lottie from 'lottie-web'

const container = ref(null)
let animation = null

onMounted(() => {
    animation = lottie.loadAnimation({
        container: container.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/icono.json'
    })
})

onBeforeUnmount(() => {
    if (animation) animation.destroy()
})
</script>

<style scoped>
.lottie-container {
    width: 200px;
    height: 200px;
}
</style>
