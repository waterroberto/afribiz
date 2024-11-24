import bg from '@/public/assets/trading-img.jpg';
import heroImage from '@/public/screenshot.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../Global/Button';

const Hero = () => {
  return (
    <section
      className='padding pt-40 sm:pt-32 lg:pt-24 min-h-screen relative overflow-hidden'
      style={{
        background: `linear-gradient(rgba(9, 22, 29, 0.5), rgba(9, 22, 29, 0.5)), url(${bg.src}) no-repeat center center/cover`,
      }}
    >
      <div className='mt-32 w-full max-w-5xl mx-auto text-gray-50 flex flex-col items-center justify-center gap-4'>
        <h1 className='text-4xl font-extrabold lg:text-5xl text-center'>
          Afribiz: Navigating Global Trade, Simplifying Investments
        </h1>
        {/* <h2 className='text-xl xl:text-2xl text-center'>
          Secure and easy way to trade Forex and other Crypto assets, with
          powerful trading tools, resources and support.
        </h2> */}
        <div className='flex items-center justify-center gap-4 my-6'>
          <Link href='/auth/register'>
            <Button color='primary_2' size='large'>Create Account</Button>
          </Link>
          <Link href='/auth/login'>
            <Button size='large' color='dark'>
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <Image
        src={heroImage}
        alt='Screenshot of Afribiz Trade Investment Dashboard'
        className='hidden sm:block w-[96vw] max-w-2xl min-h-[300px] object-cover absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-tr-3xl rounded-tl-3xl'
      />
    </section>
  );
};

export default Hero;
