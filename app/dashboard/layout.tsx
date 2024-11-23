'use client';
import Sidebar from '@/components/Admin/Sidebar';
import Referral from '@/components/Dashboard/Referral';
import Loader from '@/components/Global/Loader';
import Meta from '@/components/Global/Meta';
import Header from '@/components/Shared/Header';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import { user_links } from '@/static';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function DashboardLayout({
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
    if (!checkingStatus && !isLoggedIn) router.replace('/auth/login');
  }, [checkingStatus, isLoggedIn, router]);

  if (checkingStatus) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  if (!checkingStatus && isLoggedIn && !fetchingData && userData)
    return (
      <>
        <Meta />
        <div className='grid grid-cols-12 bg-gray-100 relative min-h-screen'>
          <div
            className={`bg-primary duration-500 transition-all border-r-[1px] border-r-gray-50 w-0 h-0 ${
              sidebarOpen ? 'lg:col-span-2' : 'lg:col-span-1'
            } `}
          >
            <Sidebar
              isOpen={sidebarOpen}
              toggleSidebar={handleToggleSidebar}
              links={user_links}
            />
          </div>
          <div
            className={`duration-500 bg-primary col-span-12 py-24 min-h-screen p-4 md:px-8 xl:px-16  ${
              sidebarOpen ? 'lg:col-span-10' : 'lg:col-span-11'
            }`}
          >
            <Header isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} />
            <div className='w-full max-w-7xl mx-auto bg-primary'>
              {children}
              <div className='mt-8'>
                {/* <GetSupport /> */}
                <Referral />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
