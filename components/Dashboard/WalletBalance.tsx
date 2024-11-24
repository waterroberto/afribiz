'use client';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { BiSolidBank } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { IoIosSettings, IoMdAdd } from 'react-icons/io';
import Button from '../Global/Button';

export default function WalletBalance() {
  const { userData } = useContext(UserDataContext);

  const [showBalance, setShowBalance] = useState(false);

  const toggleShowBalance = () => setShowBalance((prev) => !prev);

  if (!userData) return;

  return (
    <div className='rounded-3xl bg-primary-2 p-8 min-h-72 py-12 md:p-12  text-dark welcome'>
      <div className='flex items-center gap-4 mb-8 text-gray-600'>
        <p className='text-lg font-bold text-white'>Available Balance</p>
        <button role='button' onClick={toggleShowBalance} className='text-2xl'>
          {showBalance ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <p className='text-4xl text-dark lg:text-5xl my-4 font-bold max-w-2xl'>
        {showBalance ? (
          <span>
            {userData?.currency}
            {(
              userData?.wallet.profit +
              userData?.wallet.bonus +
              userData?.wallet.investment + 
              userData?.wallet.deposit
            ).toLocaleString()}
          </span>
        ) : (
          <span>{userData?.currency} *******</span>
        )}
      </p>
      <p className='mb-2 text-sm text-white'>{userData._id}</p>
      <div className='mt-4 flex flex-col sm:flex-row md:items-center gap-4'>
        <Link href='/dashboard/profile'>
          <Button
            startIcon={<IoIosSettings />}
            endIcon={<HiArrowNarrowRight />}
          >
            Account
          </Button>
        </Link>
        <Link href='/dashboard/deposit' color=''>
          <Button
            startIcon={<BiSolidBank />}
            endIcon={<IoMdAdd />}
            color='secondary'
          >
            Deposit
          </Button>
        </Link>
      </div>
    </div>
  );
}
