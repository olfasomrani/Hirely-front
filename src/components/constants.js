import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';

export const adminMenu = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link href="/admin/accueil">Accueil</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link href="/admin/utilisateurs">Utilisateurs</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link href="/admin/parametres">Paramètres</Link>,
    },
  ];
  
  export const memberMenu = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link href="/member/accueil">Accueil</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link href="/member/profil">Mon Profil</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link href="/member/parametres">Paramètres</Link>,
    },
  ];
  
  