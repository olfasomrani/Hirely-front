import React, { createContext, useCallback, useEffect, useState } from "react";
import useThrottleFunction from "@/hooks/useThrottle";
import { isWindowAvailable } from "@/utils/helpers";

export const EDevice = {
    MOBILE: "MOBILE",
    TABLET: "TABLET",
    DESKTOP: "DESKTOP",
    TV: "TV",
};

export const DimensionContext = createContext({
    device: EDevice.TV,
    devices: EDevice,
    width: 0,
    height: 0,
    devicePicker : (_o,_f)=>{}
});

const getDeviceType = (width) => {
    if (width < 600) {
        return EDevice.MOBILE;
    } else if (width < 900) {
        return EDevice.TABLET;
    } else if (width < 1400) {
        return EDevice.DESKTOP;
    } else {
        return EDevice.TV;
    }
};

function DimensionProvider({ children }) {
    const [windowDimension, setWindowDimension] = useState({
        width: isWindowAvailable() ? window.innerWidth : 0,
        height: isWindowAvailable() ? window.innerHeight : 0,
    });
    const [device, setDevice] = useState(getDeviceType(windowDimension.width));

    const handleResize = useThrottleFunction(() => {
        const newDimensions = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        setWindowDimension(() => newDimensions);
        setDevice(getDeviceType(newDimensions.width));
    }, 100);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const devicePicker = useCallback(
        (obj, fallback) =>isWindowAvailable() ? obj?.[device] ?? fallback : fallback,
        [device]
    );

    return (
        <DimensionContext.Provider
            value={{
                devices: EDevice,
                device,
                width: windowDimension.width,
                height: windowDimension.height,
                devicePicker,
            }}>
            {children}
        </DimensionContext.Provider>
    );
}

export default DimensionProvider;
