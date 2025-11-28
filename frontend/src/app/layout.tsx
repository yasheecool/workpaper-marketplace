import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/components/QueryProvider';
import { ToastContainer } from 'react-toastify';

import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cimplico Marketplace',
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ToastContainer position='bottom-right' />
        <Footer />
      </body>
    </html>
  );
}
