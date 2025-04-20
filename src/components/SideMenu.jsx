'use client';
import React, { useState } from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  SolutionOutlined,
  TeamOutlined,
  SettingOutlined,
  BarChartOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Menu, Button, Drawer } from 'antd';
import classNames from 'classnames';

const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Utilisateurs',
  },
  {
    key: 'offers',
    icon: <SolutionOutlined />,
    label: 'Offres',
  },
  {
    key: 'candidates',
    icon: <TeamOutlined />,
    label: 'Candidats',
  },
  {
    key: 'recruiters',
    icon: <UserOutlined />,
    label: 'Recruteurs',
  },
  {
    key: 'stats',
    icon: <BarChartOutlined />,
    label: 'Statistiques',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Paramètres',
  },
];

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden p-2">
        <Button
          type="text"
          icon={<MenuOutlined className="text-xl" />}
          onClick={() => setMobileOpen(true)}
        />
      </div>

      {/* Desktop sidebar */}
      <div
        className={classNames(
          'hidden md:block h-screen bg-white border-r shadow-md transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex justify-end p-2">
          <Button
            type="text"
            icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          inlineCollapsed={collapsed}
          style={{ height: '100%', borderRight: 0 }}
          items={menuItems}
        />
      </div>

      {/* Mobile drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ height: '100%' }}
          items={menuItems}
        />
      </Drawer>
    </>
  );
};

export default SideMenu;
