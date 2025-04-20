'use client';
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';

const Header = () => {
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          icon: <ProfileOutlined />,
          label: <span>Mon Profil</span>,
        },
        {
          key: '2',
          icon: <SettingOutlined />,
          label: <span>Paramètres</span>,
        },
        {
          key: '3',
          icon: <LogoutOutlined />,
          label: <span>Déconnexion</span>,
        },
      ]}
    />
  );

  return (
    <header className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-20">

    {/* Left: Search */}
    <div className="flex items-center gap-3">
      <div className="relative hidden sm:block">
        <input
          type="text"
          placeholder="Rechercher..."
          className="pl-10 pr-4 py-2 rounded-full text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
        />
        <SearchOutlined className="absolute left-3 top-2.5 text-gray-400" />
      </div>
    </div>
  
    {/* Right: Notification + Dropdown */}
    <div className="flex items-center gap-4">
      <button className="relative hover:text-white">
        <BellOutlined className="text-xl" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          3
        </span>
      </button>
  
      <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <UserOutlined className="text-blue-800" />
          </div>
          <span className="hidden sm:inline font-medium text-sm">Admin</span>
          <DownOutlined className="text-xs" />
        </div>
      </Dropdown>
    </div>
  </header>
  
  
  
  );
};

export default Header;
