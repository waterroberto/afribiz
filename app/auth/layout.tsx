import Logo from '@/components/Global/Logo';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex items-center flex-col justify-center gap-4 p-4 py-16'>
      <Link href='/'>
        <Logo />
      </Link>
      {children}
    </div>
  );
}
