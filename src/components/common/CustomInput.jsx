import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const CustomInput = ({ value, onChange, placeholder }) => (
    <div className="relative">
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="pl-10 py-2 w-full sm:w-62 md:w-80 lg:w-96 h-[50px] shadow-md focus:shadow-lg rounded-lg outline-none bg-white"
        />
        <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
);

export default CustomInput;
