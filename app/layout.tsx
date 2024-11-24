import ClientProvider from '@/components/Providers/ClientProvider';
import type { Metadata } from 'next';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
// import 'primeflex/primeflex.css';
import './globals.css';
import Script from 'next/script';
import Head from 'next/head';



export const metadata: Metadata = {
  title: 'Afribiz Trade Investment',
  description: 'Effortlessly increase your trading potential',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <ClientProvider>{children}</ClientProvider>
        {/* <Script src="//code.tidio.co/kwyr7hbgd3fvtdcsyurhlqox3ckyat97.js" async></Script> */}
      </body>
    </html>
  );
}
