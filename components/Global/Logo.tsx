'use client'
import logo from '@/assets/afibiz icon.png';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Logo() {
    const pathname = usePathname();
    const authPaths = ['/dashboard', '/admin']; // Add all your auth paths here
  const shouldShowNavbar = authPaths.includes(pathname);

  return (
    <div className=" flex flex-row items-center">
    <Image
      src={logo}
      alt='Art Chain Market Logo'
      width={80}
      height={80}
      className='rounded-xl p-1'
    />
    {!shouldShowNavbar ?   <h2 className=" text-white text-xl">Afribiz Trading Platform</h2> : null }
    </div>
  );
}
