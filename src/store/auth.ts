import { defineStore } from 'pinia'
import authService from '@/core/OutSessionLayout/services/AuthService';
import type { User } from '@/core/OutSessionLayout/types/Auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        token: null as string | null,
        isAuthenticated: false,
        isLoading: true
    }),
    actions: {
        async checkAuth() {
            this.isLoading = true;

            if(authService.isAuthenticated()){
                const user = authService.getCurrentUser();
                const token = authService.getCurrentToken();

                if(user && token){
                    this.user = user;
                    this.token = token;
                    this.isAuthenticated = true;
                    this.isLoading = true;
                    return true;
                }
            }

            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            this.isLoading = false;
            return false;
        },

        async login(email: string, password: string){
            this.isLoading = true;

            const result = await authService.login(email, password);

            if(result.success && result.token){
                const user = authService.getCurrentUser();

                if(user){
                    this.user = user;
                    this.token = result.token;
                    this.isAuthenticated = true;
                    this.isLoading = false;
                    return true;
                }
            }

            this.isLoading = false;
            return false;
        },

        logout(){
            authService.logout();
            this.user = null
            this.token = null
            this.isAuthenticated = false
            this.isLoading = false
        }
    }
})
