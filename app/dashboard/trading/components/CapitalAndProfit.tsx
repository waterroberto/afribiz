import UserDataContext from '@/context/UserDataContext';
import React, { useContext } from 'react';

export default function CapitalAndProfit() {
  const { userData } = useContext(UserDataContext);

  return (
    <div className='p-8 bg-blue-100 rounded-2xl grid grid-cols-2 gap-2 text-gray-700 border-2 border-white'>
      <div className='flex flex-col items-center justify-center gap-2 border-r-8 border-r-white'>
        <p className='text-xl font-bold'>
          {userData?.currency}
          {userData?.wallet.deposit.toLocaleString()}
        </p>
        <span className='text-sm font-medium'>Capital</span>
      </div>

      <div className='flex flex-col items-center justify-center gap-2'>
        <p className='text-xl font-bold'>
          {userData?.currency}
          {userData?.wallet.profit.toLocaleString()}
        </p>
        <span className='text-sm font-medium'>Profit</span>
      </div>
    </div>
  );
}
