import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/components/QueryProvider';

import Footer from '@/components/Footer';

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
        <Footer />
      </body>
    </html>
  );
}
