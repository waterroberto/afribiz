import React from 'react';

export default function WhatIsForex() {
  return (
    <section className='p-8 py-24 bg-primary lg:px-24'>
      <p className='text-3xl md:text-4xl font-bold text-white mb-16 text-center'>
        About <span className='text-neutral'>Afribiz Trade Investment</span>
      </p>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='md:p-4'>
          <p className='text-2xl font-semibold text-neutral mb-8'>
            Who we are. What we do.
          </p>
          <p className='md:text-lg text-white'>
            For decades, the forex market was dominated by a privileged few with insider knowledge. But our platform is revolutionizing the industry, giving prospective investors the chance to realize their investment dreams. Grow your trade account and let the internet work for you, freeing you from the constraints of a 9-5 job. The foreign exchange market operates 24/7, and with our user-friendly platform, you can make it work for you
            <br />
            We specialize in trading and ensuring profitable transactions in Forex, Commodities (stocks), Indices, and more. Our team manages losses and oversees the trading process to achieve the average required monthly ROI for your selected package, facilitating your success in the global market.
            <br />
            Our elite trade development team and account managers are handpicked experts with over 7 years of experience, having traded for several of the most reputable brokers. Join over 4,000 satisfied investors worldwide who trust our services.
          </p>
        </div>
        <iframe
          width='420'
          height='315'
          className='w-full max-w-[1024px] mx-auto block h-[315px] sm:h-[400px] md:h-[512px] rounded-2xl'
          src='https://www.youtube.com/embed/GmOzih6I1zs?autoplay=1'
        ></iframe>
      </div>
    </section>
  );
}
