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
  ProfileOutlined,
} from '@ant-design/icons';
import { Menu, Button, Drawer } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Récupération du rôle à partir de l'URL
  let userRole = '';
  if (pathname.startsWith('/candidat')) {
    userRole = 'candidat';
  } else if (pathname.startsWith('/entreprise')) {
    userRole = 'recruteur';
  } else if (pathname.startsWith('/admin')) {
    userRole = 'admin';
  }

  const menuItems =
    userRole === 'recruteur'
      ? [
          {
            key: '1',
            icon: <DashboardOutlined />,
            label: <Link href="/entreprise/accueil">Dashboard</Link>,
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: <Link href="/entreprise/offres">Offres</Link>,
          },
          {
            key: '2',
            icon: <ProfileOutlined />,
            label: <Link href="/entreprise/entretien">Entretien</Link>,
          },{
            key: '2',
            icon: <UserOutlined />,
            label: <Link href="/entreprise/candidat">Candidat</Link>,
          },
          {
            key: 'stats',
            icon: <BarChartOutlined />,
            label: <Link href="/entreprise/statistiques">Statistiques</Link>,
          },
           {
            key: 'stats',
            icon: <BarChartOutlined />,
            label: <Link href="/entreprise/rapport">Rapport</Link>,
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <Link href="/entreprise/parametres">Paramétres</Link>,
          },
        ]
      : userRole === 'candidat'
      ? [
          {
            key: '1',
            icon: <DashboardOutlined />,
            label: <Link href="/candidat/accueil">Dashboard</Link>,
          },
          {
            key: '2',
            icon: <ProfileOutlined />,
            label: <Link href="/candidat/profil">Profil</Link>,
          },
          {
            key: '3',
            icon: <SolutionOutlined />,
            label: <Link href="/candidat/cvBuilder">Builder</Link>,
          },
               {
            key: '4',
            icon: <SolutionOutlined />,
            label: <Link href="/candidat/offres">offres</Link>,
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <Link href="/candidat/parametres">Paramétres</Link>,
          },
        ]
      : [
          {
            key: '1',
            icon: <DashboardOutlined />,
            label: <Link href="/admin/accueil">Dashboard</Link>,
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: <Link href="/admin/utilisateurs">Utilisateurs</Link>,
          },
          {
            key: '3',
            icon: <SolutionOutlined />,
            label: <Link href="/admin/offres">Offres</Link>,
          },
          {
            key: 'stats',
            icon: <BarChartOutlined />,
            label: <Link href="/admin/statistiques">Statistiques</Link>,
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <Link href="/admin/parametres">Paramétres</Link>,
          },
        ];

  return (
    <>
      <div className="md:hidden p-2">
        <Button
          type="text"
          icon={<MenuOutlined className="text-xl" />}
          onClick={() => setMobileOpen(true)}
        />
      </div>
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
