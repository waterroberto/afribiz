import Image from 'next/image';
import React from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { LiaChartBar, LiaUsersSolid } from 'react-icons/lia';
import { MdContactSupport, MdOutlinePriceCheck } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { SiFuturelearn } from 'react-icons/si';

const features = [
  {
    icon: <LiaChartBar />,
    title: 'Platforms',
    body: 'Cutting edge trading technology that provides power, reliability, and mobility.',
  },
  {
    icon: <AiOutlineProduct />,
    title: 'products',
    body: 'We offer the full suite of powerful trading products to new traders or seasoned professionals.',
  },
  {
    icon: <RiCustomerService2Fill />,
    title: 'customer service',
    body: 'Get the support you need, from our talented support team.',
  },
  {
    icon: <MdOutlinePriceCheck />,
    title: 'Pricing',
    body: 'Spend your time trading, not wondering what it costs.',
  },
  {
    icon: <SiFuturelearn />,
    title: 'learn',
    body: 'Market insights, education, and resources for new and seasoned traders.',
  },
  {
    icon: <LiaUsersSolid />,
    title: 'Accounts',
    body: 'Various account types tailored to your needs.',
  },
];

export default function OurServices() {
  return (
    <section
      id='services'
      className='p-4 sm:px-8 lg:px-16 xl:px-32 py-16 items-center bg-primary'
    >
      <div className='mb-16 flex flex-col items-center justify-center mx-auto max-w-2xl'>
        <span className='mb-4 text-sm p-2 px-4 inline-block border border-gray-600 rounded-full text-gray-600'>
          What we offer
        </span>
        <p className='gradient-text text-2xl sm:text-4xl lg:text-5xl font-bold text-center'>
          Join <span className='text-dark'>Afribiz Trade Investment</span>
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-6xl'>
        {features.map((feature) => (
          <div
            key={feature.title}
            className='flex items-center gap-4 bg-blue-50 p-8 rounded-2xl border border-gray-100'
            data-aos='fade-up'
          >
            <div className='h-20 w-20 border border-primary rounded-2xl text-neutral text-4xl flex items-center justify-center'>
              {feature.icon}
            </div>
            <div className='flex-1'>
              <p className='font-bold text-lg text-blue-900 capitalize'>
                {feature.title}
              </p>
              <p className='text-gray-500'>{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
