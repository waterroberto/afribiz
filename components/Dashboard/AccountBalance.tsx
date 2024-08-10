'use client';
import UserDataContext from '@/context/UserDataContext';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { FaArrowsDownToPeople } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { TbMoneybag } from 'react-icons/tb';

const card_icon_style =
  'h-16 w-16 flex items-center justify-center rounded-xl text-white';

export default function AccountBalance() {
  const { userData } = useContext(UserDataContext);

  if (!userData) return;

  return (
    <section className='my-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
      {/*  */}
      <div className='rounded-xl bg-white p-6 flex items-center gap-4 border border-gray-200'>
        <span className={`${card_icon_style} bg-red-500`}>
          <TbMoneybag className='text-3xl' />
        </span>
        <div>
          <p className='text-gray-600 font-medium text-sm'>Capital</p>
          <p className='text-neutral font-semibold my-2'>
            {userData.currency}
            {userData.wallet.deposit.toLocaleString()}
          </p>
          <p className='text-xs text-gray-400'>Total Deposit</p>
        </div>
      </div>
      {/*  */}
      <div className='rounded-xl bg-white p-6 flex items-center gap-4 border border-gray-200'>
        <span className={`${card_icon_style} bg-teal-600`}>
          <GiReceiveMoney className='text-3xl' />
        </span>
        <div>
          <p className='text-gray-600 font-medium text-sm'>Profit</p>
          <p className='text-neutral font-semibold my-2'>
            {userData.currency}
            {userData.wallet.profit.toLocaleString()}
          </p>
          <p className='text-xs text-gray-400'>Investment Returns</p>
        </div>
      </div>
      {/*  */}
      <div className='rounded-xl bg-white p-6 flex items-center gap-4 border border-gray-200'>
        <span className={`${card_icon_style} bg-gray-600`}>
          <FaArrowsDownToPeople className='text-3xl' />
        </span>
        <div>
          <p className='text-gray-600 font-medium text-sm'>Investments</p>
          <p className='text-neutral font-semibold my-2'>
            {userData.currency}
            {userData.wallet.investment.toLocaleString()}
          </p>
          <p className='text-xs text-gray-400'>Investment Plan</p>
        </div>
      </div>
      {/*  */}
      <div className='rounded-xl bg-white p-6 flex items-center gap-4 border border-gray-200'>
        <span className={`${card_icon_style} bg-orange-600`}>
          <HiOutlineStatusOnline className='text-3xl' />
        </span>
        <div>
          <p className='text-gray-600 font-medium text-sm'>Account Status</p>
          <p
            className={clsx(
              'font-semibold my-2',
              userData.isBlocked ? 'text-orange-600' : 'text-green-600'
            )}
          >
            {userData.isBlocked ? 'Inactive' : 'Active'}
          </p>
          <p className='text-xs text-gray-400'>Trading Status</p>
        </div>
      </div>
    </section>
  );
}
