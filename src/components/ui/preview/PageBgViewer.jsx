import React from "react";
import ImageViewer from "./ImageViewer";

const PageBgViewer = ({ children, imgSrc, fullScreen }) => {
    return (
        <div className={`w-full min-h-screen bg-white relative ${fullScreen ? "":"desktop:flex desktop:justify-start xl:justify-center desktop:items-center"}`}>
            <div
                className={`h-screen w-screen fixed top-0 end-0 ${
                    fullScreen ? "" : "desktop:w-1/2"
                } z-[1]`}
                aria-hidden="true">
                <ImageViewer
                    src={imgSrc}
                    className={`!h-full !w-full object-cover `}
                    aria-hidden="true"
                    rootClassName="!w-full !h-full "
                />
            </div>
            {fullScreen ? (
                children
            ) : (
                <div className="overflow-hidden m-0 desktop:m-5 rounded-none desktop:rounded-lg desktop:shadow-center bg-white w-full h-full desktop:w-[800px] relative z-[2] xl:translate-x-[-40%] transition-all duration-300">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageBgViewer;
