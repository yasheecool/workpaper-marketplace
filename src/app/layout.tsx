import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { ToastContainer } from 'react-toastify';

import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workpaper Marketplace',
  description:
    'A marketplace that lists verified workpaper content such as procedures, calculations, checklists, wikis and reports.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer position='bottom-right' />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
