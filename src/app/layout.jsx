// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import 'antd/dist/reset.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Recuirtmnt",
  description: "application sirh de gestion des ressources humaines et systéme des entreprises",
  icons: {
    icon: "/path/to/your/favicon.png",
  },
  font: {
    href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap",
  },
};

export const viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
