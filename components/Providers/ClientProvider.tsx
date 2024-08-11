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
            <Script
              src='//code.tidio.co/ankiuavtn7za7vbhqvgyhbketndybhga.js'
              async
            />
            {children}
          </GoogleTranslateProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </>
  );
}