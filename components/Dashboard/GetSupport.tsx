'use client';
import React from 'react';

const GetSupport = () => {
  return (
    <div className='p-6 bg-primary_3 rounded-xl'>
      <p className='text-lg text-gray-100 font-bold'>Get Support</p>
      <p className='text-gray-200 text-sm my-4'>
        Ask a question by using the live chat button. Our support team will get
        back to you by email.
      </p>
      <a
        href='mailto:support@afribizinvestment.online
'
        className='text-sm p-3 px-8 mt-4 font-medium bg-primary text-gray-100 rounded-xl'
      >
        Get Support Now
      </a>
    </div>
  );
};

export default GetSupport;
