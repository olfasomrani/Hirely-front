"use client";
import React, { useState } from "react";

import { Input, notification, Checkbox, Button} from "antd";

import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";




const LoginForm = () => {
    const [visible, setVisible] = useState(false);

    const handleClick = ()=> {
      setVisible(!visible);
    };

    return(
        <form className="flex flex-col justify-center mt-7 w-full">
        <Input
          type="email"
          placeholder="email"
          className="mb-10"
        />
        <Input.Password
          placeholder="mot de passe"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
          className="mb-4"
          onClick={handleClick} 
        />
        <Button
          type="primary"
          className="bg-tw-primary font-sans font-bold text-[14px] items-center mb-4"
        >
          Connexion
        </Button>
        <div className="flex gap-5 items-center self-stretch mt-5 text-sm leading-none max-md:mr-2">
          <label className="flex gap-2 items-center self-stretch my-auto text-slate-700">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Se souvenir de moi</span>
          </label>
          <a href="#" className="self-stretch my-auto text-tw-primary">
            Mot de passe oublié?
          </a>
        </div>
      </form>
    );

}

export default LoginForm;
