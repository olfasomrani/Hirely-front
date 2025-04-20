import useDeviceDimension from "@/hooks/useDeviceDimension";
import React from "react";

const PageContainer = ({ children, isLoginPage }) => {
    const { height } = useDeviceDimension();
    return (
        <div
            className="w-full bg-white flex flex-row"
            style={{ minHeight: `${height - 64}px` }}>
            {children}
        </div>
    );
};

export default PageContainer;
