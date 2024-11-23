import Link from 'next/link';
import React from 'react';
import Logo from './Global/Logo';

const Footer = () => {
  return (
    <footer className='p-4 sm:p-8 md:p-16 xl:px-32 pt-24 pb-24 footer text-gray-50 bg-gray-950'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-16'>
        <div>
          <Link href='/' className='block mb-4 font-extrabold text-xl'>
            <Logo />
          </Link>
          <p>
            Trade Bitcoin, Litecoin, Ethereum, Bitcoin Cash, and more than 7+
            currency pairings.Enjoy several benefits and explore the awesome
            features we have to offer.
          </p>
        </div>
        {/* . . . */}
        <div>
          <p className='mb-4 text-lg sm:text-xl font-extrabold text-neutral'>
            Quick Links
          </p>
          <div className='flex flex-col mb-3 gap-4'>
            <Link href='/'>Home</Link>
            <Link href='/#about'>About us</Link>
            <Link href='/#contact'>Contact</Link>
          </div>
        </div>
        {/* . . . */}
        <div>
          <p className='mb-4 text-lg sm:text-xl font-extrabold text-neutral'>
            Contact Us
          </p>
          <div>
            <p>support@bluechipstrade.online</p>
            <p>HPQCH, 11 Wilson St, Montreal Canada.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
