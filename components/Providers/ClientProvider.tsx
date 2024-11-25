'use client';
import { AuthContextProvider } from '@/context/AuthContext';
import { UserDataContextProvider } from '@/context/UserDataContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import GoogleTranslateProvider from './GoogleTranslateProvider';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <UserDataContextProvider>
          <GoogleTranslateProvider>
             {/* <Script src="//code.tidio.co/kwyr7hbgd3fvtdcsyurhlqox3ckyat97.js" async></Script> */}
              <Script src="//code.jivosite.com/widget/ZrZNLWDWkz" async></Script>

            {children}
          </GoogleTranslateProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </>
  );
}
