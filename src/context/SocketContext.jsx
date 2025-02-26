import useAuth from "@/hooks/useAuth";
import { createContext, useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({
    connectedSocket: null,
});

const socket = io(process.env.NEXT_PUBLIC_API_URL, {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Credentials": "true",
    },
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
});

const SocketProvider = ({ children }) => {
    const connectedSocket = useRef(socket);
    const { isLogged } = useAuth();

    const handleOnline = () => {
        if (!connectedSocket.current.connected && isLogged) {
            connectedSocket.current.connect();
        } else if (!isLogged && connectedSocket.current.connected) {
            connectedSocket.current.disconnect();
        }
    };

    const handleOffline = () => {
        if (connectedSocket.current.connected) {
            connectedSocket.current.disconnect();
        }
    };

    useEffect(() => {
        if (isLogged) handleOnline();
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [isLogged]);

    return (
        <SocketContext.Provider
            value={{ connectedSocket: connectedSocket.current }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
