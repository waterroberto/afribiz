'use client';
import Sidebar from '@/components/Admin/Sidebar';
import Loader from '@/components/Global/Loader';
import Meta from '@/components/Global/Meta';
import Header from '@/components/Shared/Header';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import { admin_links } from '@/static';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { checkingStatus, isLoggedIn } = useContext(AuthContext);
  const { fetchingData, userData } = useContext(UserDataContext);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (!checkingStatus && !isLoggedIn) {
      router.replace('/auth/login');
    } else if (
      !checkingStatus &&
      isLoggedIn &&
      userData &&
      !userData?.isAdmin
    ) {
      router.replace('/dashboard');
    }
  }, [checkingStatus, isLoggedIn, router, userData]);

  if (checkingStatus) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  if (
    !checkingStatus &&
    isLoggedIn &&
    !fetchingData &&
    userData &&
    userData?.isAdmin
  )
    return (
      <>
        <Meta />
        <div className='grid grid-cols-12 bg-primary_2 relative min-h-screen'>
          <div
            className={`bg-primary duration-500 transition-all border-r-[1px] border-r-gray-50 w-0 h-0 ${
              sidebarOpen ? 'lg:col-span-2' : 'lg:col-span-1'
            } `}
          >
            <Sidebar
              isOpen={sidebarOpen}
              toggleSidebar={handleToggleSidebar}
              links={admin_links}
            />
          </div>
          <div
            className={`duration-500 col-span-12 py-24 min-h-screen p-4 md:px-8 xl:px-16  ${
              sidebarOpen ? 'lg:col-span-10' : 'lg:col-span-11'
            }`}
          >
            <Header isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} />
            <div className='w-full max-w-7xl mx-auto'>{children}</div>
          </div>
        </div>
      </>
    );
}
