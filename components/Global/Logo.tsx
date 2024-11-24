import logo from '@/assets/afibiz icon.png';
import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <div className=" flex flex-row items-center">
    <Image
      src={logo}
      alt='Art Chain Market Logo'
      width={80}
      height={80}
      className='rounded-xl p-1'
    />
    <h2 className=" text-white text-xl">Afribiz</h2>
    </div>
  );
}
