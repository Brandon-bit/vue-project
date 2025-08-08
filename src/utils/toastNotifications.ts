import { useToast } from "vue-toastification";

export const showNotification = (msg : string, status : string, time : number = 3000) => {
    const toast = useToast();
    
    switch (status) {
        case "success":
            toast.success(msg, {
                timeout: time,
            });
        break;

        case "error":
            toast.error(msg, {
                timeout: time,
            });
        break;

        case "warning":
            toast.warning(msg, {
                timeout: time,
            });
        break;
    }
}