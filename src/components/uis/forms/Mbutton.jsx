import React from "react";
import { Button } from "antd";
import clsx from "clsx";

const MButton = ({ isLoading, disabled, text, onClick, className, icon }) => {
    return (
        <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={clsx(
                "gap-2.5 self-stretch px-32 py-3 mt-8 text-base leading-none text-center rounded-lg max-md:px-5 w-full bg-primary",
                className
            )}
            loading={isLoading}
            disabled={disabled}
            onClick={onClick}>
            {icon}
            {text}
        </Button>
    );
};

export default MButton;
