import {ToastContainer, toast} from "react-toastify";

const NotificationContainer = () => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}
type NotificationType = "success" | "error";

const Notify = (type: NotificationType, message?: string) => {
    if(type == "success"){
        return toast.success(message ?? 'Profile updated!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return toast.error(message ?? 'Server Error', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export {
    NotificationContainer,
    Notify
}