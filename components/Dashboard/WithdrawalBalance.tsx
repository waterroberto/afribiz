'use client';
import UserDataContext from '@/context/UserDataContext';
import React, { useContext } from 'react';
import Button from '../Global/Button';
import Card from '../Global/Card';

export default function WithdrawalBalance({
  onButtonClick,
}: {
  onButtonClick: () => void;
}) {
  const { userData } = useContext(UserDataContext);

  if (!userData) return;

  return (
    <Card>
      <div className='text-gray-700'>
        <div className='p-8 flex items-center justify-center flex-col mb-8 bg-primary_3 text-blue-50 rounded-xl'>
          <p>Available balance</p>
          <p className='text-4xl font-bold mt-2'>
            {userData?.currency}
            {(
              userData?.wallet.profit +
              userData?.wallet.bonus +
              userData?.wallet.investment+
              userData?.wallet.deposit
            ).toLocaleString()}
          </p>
        </div>
      </div>
      <div className='rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-gray-600'>
        <div className='flex items-center justify-center flex-col p-4 rounded-xl bg-gray-50 border border-gray-100'>
          <p className='text-2xl font-bold'>
            {userData.currency}
            {userData.wallet.deposit.toLocaleString()}
          </p>
          <p className='text-sm'>Capital</p>
        </div>
        <div className='flex items-center justify-center flex-col p-4 rounded-xl bg-gray-50 border border-gray-100'>
          <p className='text-2xl font-bold'>
            {userData.currency}
            {userData.wallet.profit.toLocaleString()}
          </p>
          <p className='text-sm'>Profit</p>
        </div>
        <div className='flex items-center justify-center flex-col p-4 rounded-xl bg-gray-50 border border-gray-100'>
          <p className='text-2xl font-bold'>
            {userData.currency}
            {userData.wallet.investment.toLocaleString()}
          </p>
          <p className='text-sm'>Investment Plan</p>
        </div>
      </div>
      <Button block size='large' color='secondary' onClick={onButtonClick}>
        Request Withdrawal
      </Button>
    </Card>
  );
}
