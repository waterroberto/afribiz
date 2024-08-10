import anaysis_background from '@/public/analysis_background.webp';
import Image from 'next/image';
import React from 'react';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiLuggageDepositLine, RiTeamLine } from 'react-icons/ri';

const HomeWorkEthics = () => {
  return (
    <section className='p-8 py-24 bg-gray-50 lg:px-24'>
      <div className=' w-full max-w-7xl mx-auto'>
        <h4 className='font-black text-3xl uppercase mb-4'>
          We are simply the best!
        </h4>
        <p className='text-lg text-gray-900'>
          We believe in instant payments so that our investors enjoy payouts
          without unnecessary waiting time.
        </p>
        <p className='py-2 text-lg text-gray-900'>
          Our investment plans are designed to generate maximum profits with
          minimum investment.
        </p>
        <p className='text-lg text-gray-900 mb-8'>
          We work with experienced professionals, who have the zeal and
          eargerness to help people in need.
        </p>
        {/*   */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='content w-full h-full'>
            <div
              className='flex items-center justify-start gap-4 mt-8 md:mb-12'
              data-aos='flip-right'
            >
              <div className='icon text-5xl text-primary'>
                <GiReceiveMoney />
              </div>
              <div className='content'>
                <p className='font-black text-xl uppercase'>Instant Payments</p>
                <p className='text-gray-600'>
                  We make moves to achieve a monetary gain in a project or
                  agreement. This expands our firm so we help more people.
                </p>
              </div>
            </div>
            <div
              className='flex items-center justify-start gap-4 my-8 md:my-12'
              data-aos='flip-left'
            >
              <div className='icon text-5xl text-primary'>
                <RiLuggageDepositLine />
              </div>
              <div className='content'>
                <p className='font-black text-xl uppercase'>Investment plans</p>
                <p className='text-gray-600'>
                  Investment plans are designed to generate profits with minimum
                  investment. Invest as low as $100 and as high as $25,000
                </p>
              </div>
            </div>
            <div
              className='flex items-center justify-start gap-4 my-8 md:mb-12'
              data-aos='flip-right'
            >
              <div className='icon text-5xl text-primary'>
                <RiTeamLine />
              </div>
              <div className='content'>
                <p className='font-black text-xl uppercase'>Experienced team</p>
                <p className='text-gray-600'>
                  With an experience team of traders and analysts, we work
                  towards increasing our output, efficiency, financial savings &
                  innovation.
                </p>
              </div>
            </div>
          </div>
          <div className='zoom w-full h-72 md:h-96' data-aos='flip-left'>
            <Image
              src={anaysis_background}
              alt='Stocks market'
              className='rounded-3xl child'
              layout='fill'
              objectFit='cover'
              objectPosition='center'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWorkEthics;
