import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className='my-4 bg-primary_2 rounded-2xl border border-gray-200 p-6'>
      {children}
    </div>
  );
}
