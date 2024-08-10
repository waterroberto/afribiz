import React from 'react';

export default function WhatIsForex() {
  return (
    <section className='p-8 py-24 bg-white lg:px-24'>
      <p className='text-3xl md:text-4xl font-bold text-gray-700 mb-16 text-center'>
        About <span className='text-primary'>Blue Chips Trade</span>
      </p>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <iframe
          width='420'
          height='315'
          className='w-full max-w-[1024px] mx-auto block h-[315px] sm:h-[400px] md:h-[512px] rounded-2xl'
          src='https://www.youtube.com/embed/GmOzih6I1zs?autoplay=1'
        ></iframe>
        <div className='md:p-4'>
          <p className='text-2xl font-semibold text-gray-700 mb-8'>
            Who we are. What we do.
          </p>
          <p className='md:text-lg text-gray-600'>
            For decades, the dominant players in forex have been the privileged,
            in-the-know few. But our platform is disrupting the entire industry
            and equipping prospective investors with the opportunity to
            actualize their investment dreams. Grow a trade account and make
            internet work for you, relieve you from 9-5 jobs the foriegn
            exchange market work for you 24/7 with our minimalist platform.
            <br />
            We trade and ensure the coverage of transactions profitably in
            Forex, Commodities(stocks), and Indices etc. We manage losses and
            trading processes to meet up with the average required monthly quota
            ROI of your desired package and facilitation of the worldwide maket.
            <br />
            Our elite trade development team and account managers are handpicked
            from the best and have over 7 years of experience, and have traded
            for several of the most reputable brokers. Join over 4000 investors
            from all over the world satisfied with our services.
          </p>
        </div>
      </div>
    </section>
  );
}
