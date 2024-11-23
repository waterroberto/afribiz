'use client';
import UserDataContext from '@/context/UserDataContext';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';

const Referral = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className='grid grid-cols-2 border border-gray-200 my-4 rounded-2xl'>
      <div className='col-span-2 xl:col-span-1 p-6 bg-dark rounded-tl-2xl rounded-bl-2xl'>
        <p className='text-gray-100 font-extrabold text-2xl'>Refer & Earn</p>
        <p className='text-secondary text-sm'>
          Use the link to invite your friends
        </p>
      </div>
      <div className='col-span-2 xl:col-span-1 p-6 bg-primary rounded-tr-2xl rounded-br-2xl'>
        <div className='flex items-center gap-4'>
          <div className='bg-gray-200 rounded-2xl'>
            <p className='text-gray-600 text-[12px] p-4'>
              {window?.location?.origin}/auth/register?ref={userData?._id}
            </p>
          </div>
          <button
            type='button'
            className='text-sm text-secondary font-bold flex items-center gap-1'
            onClick={() => {
              window?.navigator?.clipboard
                .writeText(
                  `${
                    window?.location?.origin
                  }/auth/register?ref=${userData?._id.trim()}`
                )

                .then(() => {
                  toast.success('Link Copied');
                });
            }}
          >
            <FaCopy />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Referral;
