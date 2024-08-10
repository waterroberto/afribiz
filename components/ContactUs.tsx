import bg from '@/public/bg-action-contact.jpg';
import Link from 'next/link';
import React from 'react';
import Button from './Global/Button';

const ContactUs = () => {
  return (
    <section
      className='padding py-8 contact-section'
      style={{
        background: `url(${bg.src}) no-repeat center center/cover`,
      }}
    >
      <div className='flex flex-col items-center justify-center p-4 gap-4 mb-12 text-gray-50'>
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          Have a question, or want to chat?
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          Give us a call. Our support team is active 24/7 and are ready to help.
        </p>
        <Link href='/#contact'>
          <Button size='large' color='dark'>
            Contact Us
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ContactUs;
