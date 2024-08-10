'use client';
import Button from '@/components/Global/Button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center h-screen flex-col gap-8 bg-blue-50'>
      <p className='text-4xl font-semibold'>Page Not Found</p>
      <Button size='large' onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}
