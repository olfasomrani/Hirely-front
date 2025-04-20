import React from "react";
import { Select } from "antd";
const { Option } = Select;

const CustomSelect = ({ icon, placeholder, options, onSearch, onChange }) => {
    return (
        <div className="relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-3">
                <img src={icon} alt="Custom Icon" className="w-4 h-4" />
            </div>
            <Select
                showSearch
                placeholder={placeholder}
                className="w-full  sm:w-42 md:w-70 lg:w-96 h-[50px] pl-[40px] border border-black rounded-lg custom-select"
                onSearch={onSearch}
                onChange={onChange}
                filterOption={false}
                suffixIcon={
                    <img
                        src="/icons/arrows/chevron-down.svg"
                        alt="Custom Arrow"
                        className="w-4 h-4"
                    />
                }>
                {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default CustomSelect;
