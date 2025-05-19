'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import 'antd/dist/reset.css';
import './globals.css';

import HeaderComponent from '../components/layouts/Header';
import SideMenu from '../components/SideMenu';
import Footer from '../components/layouts/Footer';
import ChatBot from '../components/chatBot/chatBot'
import { usePathname } from 'next/navigation';

import ReduxProvider from './ReduxProvider'; 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/' || pathname === '/login' || pathname === '/inscription' || pathname === '/notAuthorized';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.add('styled');
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {!isLoginPage && <HeaderComponent />}
          <div style={{ display: 'flex' }}>
            {!isLoginPage && <SideMenu />}
            <div style={{ minHeight: '82vh', flex: 1 }}>{children}</div>
          </div>
          {!isLoginPage && <Footer />}
          {!isLoginPage && <ChatBot />}
        </ReduxProvider>
      </body>
    </html>
  );
}
