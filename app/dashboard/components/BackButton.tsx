'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function BackButton() {
  const { back } = useRouter();
  return (
    <button
      type='button'
      role='button'
      className='flex items-center gap-4 mb-8 p-4 font-medium text-white'
      onClick={() => back()}
    >
      <IoArrowBackOutline className=" text-neural" />
      <span className='text-sm text-neutral'>Go Back</span>
    </button>
  );
}
