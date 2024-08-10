import ClientProvider from '@/components/Providers/ClientProvider';
import type { Metadata } from 'next';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blue Chips Trade',
  description: 'Effortlessly increase your trading potential',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
