import React from "react";

const SendMsgButton = ({ icon, label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white border border-black text-black px-4 py-0.5 rounded flex items-center justify-center w-[183px] h-[50px] shadow-md ${className}`}
    >
      {icon && <img src={icon} alt={label} className="mr-3 w-6 h-6" />}
      <span>{label}</span>
    </button>
  );
};

export default SendMsgButton;
