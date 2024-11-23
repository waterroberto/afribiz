'use client';
import UserDataContext from '@/context/UserDataContext';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { CgMenu } from 'react-icons/cg';
import UserAvatar from '../Shared/UserAvatar';

export interface AdminType {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  profileImage: string | null;
  status: 'ACTIVATED';
  token: string;
  twoFactorAuth: number;
  updatedAt: string;
  userType: 'ADMIN';
  uuid: string;
  verified: number;
}

export default function Header({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const { userData } = useContext(UserDataContext);
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState('');
  const [adminDetails, setAdminDetails] = useState<null | AdminType>(null);

  const page = pathname.split('/');

  useEffect(() => {
    const lastIndex = page.length - 1;
    const pageName = page[lastIndex];

    setCurrentPage(pageName);
  }, [page]);

  if (!userData) return;

  return (
    <div
      className={`p-4 flex items-center justify-between md:px-8 fixed top-0 left-0 w-full z-20 bg-primary ${
        isOpen ? 'lg:left-[16.66%] lg:w-5/6' : 'lg:left-[8.33%] lg:w-11/12'
      }`}
    >
      <div className='flex items-center gap-8'>
        <button
          className='font-bold capitalize text-2xl text-neutral'
          onClick={toggleSidebar}
        >
          <CgMenu />
        </button>
        <p className='font-medium text-lg capitalize text-neutral'>
          {currentPage}
        </p>
      </div>
      <div className='flex items-center gap-8'>
        <UserAvatar name={userData.fullname} title={adminDetails?.userType} />
      </div>
    </div>
  );
}
