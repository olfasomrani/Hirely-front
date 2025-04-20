import React from "react";

const DoubleColumnFormRow = ({ children, className = "" }) => {
    return (
        <div
            className={`flex flex-col tablet:flex-row tablet:gap-x-3 tablet:items-center ${className}`}>
            {children}
        </div>
    );
};

export default DoubleColumnFormRow;
