import React from "react";

const Icon = ({ icon, size = 24, color = "#000000", bgColor, ...props }) => {
    const _styles = {
        ...(bgColor ? { backgroundColor: bgColor } : {}),
    };
    const iconWithColor = icon.replace(
        /currentColor/g,
        color.replace("#", "%23")
    );
    return (
        <div
            {...props}
            style={{ ...props.style, ..._styles, width: size, height: size }}>
            <img src={iconWithColor} className="select-none" />
        </div>
    );
};

export default Icon;
