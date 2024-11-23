'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Global/Logo';

type SidebarProps = {
  isOpen: Boolean;
  toggleSidebar: () => void;
  links: {
    name: string;
    icon: React.ReactNode;
    page: string;
  }[];
};

export default function Sidebar({
  isOpen,
  toggleSidebar,
  links,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`w-screen h-screen z-30 fixed top-0 left-0 backdrop-blur-sm bg-[#0000004f] duration-300 block lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed top-0 z-50 bg-primary h-screen duration-300 overflow-y-auto ${
          isOpen
            ? 'lg:w-1/6 translate-x-0 w-64 left-0'
            : 'lg:w-1/12 -translate-x-[100%] lg:translate-x-0 w-0 -left-4 lg:left-0'
        }`}
      >
        <div className='p-4 mt-4 mb-16 flex items-center justify-center'>
          <Logo />
        </div>
        <div className={'p-2'}>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.page}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '8px 0',
              }}
              onClick={toggleSidebar}
            >
              <div
                className={clsx(
                  'my-1 py-3 flex gap-4 w-full h-10 items-center duration-500 rounded-md text-md',
                  pathname.trim() === link.page
                    ? 'bg-primary-2 text-[#0177FB] bg-gray-50'
                    : 'text-neutral',
                  isOpen ? 'justify-start pl-6' : 'justify-center pl-0'
                )}
              >
                <span>{link.icon}</span>
                {isOpen && <p className={`capitalize`}>{link.name}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
