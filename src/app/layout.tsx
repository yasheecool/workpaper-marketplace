import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        {children}
        <footer className='bg-gray-50 py-18'>
          <div className='max-w-7xl px-4 mx-auto w-[90vw]'>
            <p className='text-3xl'>Footer</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
