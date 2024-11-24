'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { CgMenu } from 'react-icons/cg';
import TradingViewTicker from './Dashboard/Widgets/TradingViewTicker';
import Button from './Global/Button';
import Logo from './Global/Logo';

const links = [
  { name: 'home', url: '/' },
  { name: 'about us', url: '/#about' },
  { name: 'contact us', url: '/#contact' },
  { name: 'trending', url: '/#trending' },
];

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const toggleMobileNav = () => setShowMobileNav((prev) => !prev);

  return (
    <header className='bg-primary w-full fixed top-0 left-0 max-h-40 z-20'>
      <nav className='padding border-b border-b-gray-100 flex items-center justify-between'>
        <Link href='/'>
          <Logo />
        </Link>

        <ul className='padding items-center gap-16 hidden sm:flex'>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.url}
                className='text-white font-medium capitalize'
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='items-center gap-4 hidden sm:flex'>
          <Link href='/auth/login'>
            <Button color='white' variant='outlined'>Login</Button>
          </Link>
          <Link href='/auth/register'>
            <Button color='primary_2'>Create Account</Button>
          </Link>
        </div>

        <button
          aria-label='navbar toggle Button'
          onClick={toggleMobileNav}
          className='block sm:hidden text-neutral p-2 z-20 duration-500 border-[1px] rounded-md'
        >
          <CgMenu className='text-2xl' />
        </button>
      </nav>

      <ul
        className={`absolute w-full padding items-start gap-8 flex sm:hidden flex-col shadow-2xl bg-primary duration-500 ${
          showMobileNav ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
      >
        {links.map((link) => (
          <li key={link.name} className='py-4 border-b w-full'>
            <Link
              href={link.url}
              className='text-[13px] text-white font-semibold uppercase'
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <TradingViewTicker />
    </header>
  );
};

export default Navbar;
