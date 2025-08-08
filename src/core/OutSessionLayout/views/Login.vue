<template>
    <div class="flex flex-col md:flex-row justify-center items-center p-10 rounded bg-[#2e2e2e] shadow-sm m-5">
       <div id="logo" class="mb-10 md:mb-0">
            <img :src="logotipo" />
       </div>
       <div class="divider divider-horizontal divider-primary"></div>
       <div id="form-login">
            <h1 class="text-center text-2xl md:text-3xl mb-3">Bienvenido</h1>
            <form v-on:submit="handleSubmit">
                <div class="flex flex-col">
                    <div>
                        <legend class="fieldset-legend">Correo electrónico</legend>
                        <input type="email" class="input w-full" placeholder="usuario@proyectopolis.com" v-model="formData.email"/>
                    </div>
                    <div>
                        <legend class="fieldset-legend">Contraseña</legend>
                        <div class="relative">
                            <input :type="showPassword ? 'text' : 'password'" class="input w-full" placeholder="••••••••" v-model="formData.password"/>
                            <button type="button" className="absolute top-2.5 right-3 hover:text-white transition-colors" @click="() => showPassword = !showPassword">
                                <span v-if="!showPassword" class="material-symbols-outlined">
                                    visibility
                                </span>
                                <span v-else class="material-symbols-outlined">
                                    visibility_off
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end text-sm mt-4">
                        <a class="transition-colors hover:opacity-80 text-right" target="_blank" href="https://proyectopolis.com/account/forgotpassword" style="color: var(--blue);">¿Olvidaste tu contraseña?</a>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-info w-full text-white">ACCEDER</button>
                    </div>

                    <div className="text-sm mt-4">
                        Al hacer clic en continuar, aceptas nuestros 
                        <a class="transition-colors hover:opacity-80 text-right" target="_blank" href="https://proyectopolis.com/terminos-condiciones" style="color: var(--blue);">Términos de servicio</a> y 
                        <a class="transition-colors hover:opacity-80 text-right" target="_blank" href="https://proyectopolis.com/politicas-de-privacidad" style="color: var(--blue);">Política de privacidad.</a>
                    </div>
                </div>
            </form>
       </div>
    </div>
</template>

<script lang="ts" setup>
    import logotipo from '@/assets/images/logotipo.png'
    import { useRoute, useRouter } from 'vue-router'
    import { useAuthStore } from '../../../store/auth'
    import {ref} from 'vue'
    import { showNotification } from '../../../utils/toastNotifications'


    const showPassword = ref<boolean>(false)
    const isSubmitting = ref<boolean>(false)
    const formData = ref({
        email: '',
        password: ''
    })

    const router = useRouter()
    const route = useRoute()
    const {login} = useAuthStore();

    const handleSubmit = async (e : Event) => {
        e.preventDefault();

        // Validaciones básicas
        if (!formData.value.email || !formData.value.password) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        if (!formData.value.email.includes('@')) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }

        isSubmitting.value = true;

        try{
            const result = await login(formData.value.email, formData.value.password)
            if (result) {
                showNotification('¡Bienvenido de vuelta!', 'success');
                const redirectPath = route.query.redirect as string || '/'
                router.push(redirectPath)
            } else {
                showNotification('Email o contraseña incorrectos', 'error');
            }
        }
        catch{
            showNotification("Error de conexión. Por favor, intenta nuevamente.", 'error')
        }
        finally {
            isSubmitting.value = false
        }
    }
</script>
