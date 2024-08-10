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
      className='flex items-center gap-4 mb-8 p-4 font-medium'
      onClick={() => back()}
    >
      <IoArrowBackOutline />
      <span className='text-sm'>Go Back</span>
    </button>
  );
}
