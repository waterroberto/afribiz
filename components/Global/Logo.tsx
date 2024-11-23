import logo from '@/public/logo.png';
import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <Image
      src={logo}
      alt='Art Chain Market Logo'
      width={80}
      height={80}
      className='rounded-xl p-1 bg-primary border border-gray-100'
    />
  );
}
