import { createContext, useRef } from "react";
import { toast } from "react-toastify";
import useDeviceDimension from "@/hooks/useDeviceDimension";

const Itoast = {
    ERROR: "error",
    SUCCES: "success",
    WARNING: "warning",
    INFO: "info",
};
export const ToastContext = createContext({
    toast: (_message, _type = Itoast.ERROR) => {},
    toastTypes: Itoast,
    clearToast: () => {},
});

const ToastProvider = ({ children }) => {
    const { devices, device } = useDeviceDimension();
    const toastId = useRef(null);
    const clearToast = () => {
        if (toastId.current) {
            toast.dismiss(toastId.current);
            toastId.current = null;
        }
    };
    const picker = (pick) => pick[device];
    const settoast = (message, type = Itoast.ERROR, isMessage) => {
        clearToast();

        toastId.current = toast[type](message, {
            position: picker({
                [devices.MOBILE]: "top-center",
                [devices.TABLET]: "top-center",
                [devices.DESKTOP]: "top-right",
                [devices.TV]: "top-right",
            }),
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            style: {
                zIndex: 9997,
            },
            ...(isMessage
                ? {
                      icon: false,
                  }
                : {}),
        });
    };
    return (
        <ToastContext.Provider
            value={{
                toast: settoast,
                toastTypes: Itoast,
                clearToast,
            }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
