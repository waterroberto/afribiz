'use client';

import ProfileLinkItem from '@/components/Dashboard/ProfileLinkItem';
import Button from '@/components/Global/Button';
import Logo from '@/components/Global/Logo';
import { auth } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useContext } from 'react';

export default function DashboardProfile() {
  const { userData } = useContext(UserDataContext);

  return (
    <div>
      <div className='text-white p-3 bg-dark flex flex-col md:flex-row items-start justify-between gap-2 md:items-center rounded-xl'>
        <div className='flex items-center gap-8'>
          <Logo />
          <div className='flex flex-col gap-1 items-start'>
            <p className='flex items-center gap-3'>
              {userData?.fullname}
              <span
                className={` text-sm font-bold p-1 rounded-md ${
                  userData?.isVerified ? 'bg-primary' : 'bg-red-500'
                }`}
              >
                {userData?.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </p>
            <p>{userData?.email}</p>
          </div>
        </div>
        {userData?.isAdmin && (
          <div className=''>
            <Link
              href={'/admin'}
              className='border border-primary text-sm font-bold p-2 rounded-md'
            >
              Go to Admin
            </Link>
          </div>
        )}
      </div>

      <div className='my-16'>
        <div className='mb-8'>
          <p className='text-primary font-bold'>General</p>
          <ProfileLinkItem
            pageName='profile settings'
            pageUrl='/dashboard/profile/profile-settings'
          />
          <ProfileLinkItem
            pageName='next of kin'
            pageUrl='/dashboard/profile/next-of-kin'
          />
        </div>
        <div className='mb-8'>
          <p className='text-primary font-bold mb-2'>Verification</p>
          <ProfileLinkItem
            pageName='kyc and account upgrade'
            pageUrl='/dashboard/account-upgrade'
          />
        </div>
        <div className='mb-8'>
          <p className='text-primary font-bold mb-2'>Security</p>
          <ProfileLinkItem
            pageName='change password'
            pageUrl='/dashboard/profile/change-password'
          />
        </div>

        <Button
          type='button'
          block
          color='danger'
          onClick={() => signOut(auth)}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
