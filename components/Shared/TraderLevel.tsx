'use client';
import UserDataContext from '@/context/UserDataContext';
import { ProgressBar } from 'primereact/progressbar';
import React, { useContext, useState } from 'react';
import Card from '../Global/Card';

export default function TraderLevel() {
  const { userData } = useContext(UserDataContext);

  if (!userData) return;

  return (
    <Card>
      <p className='mb-4 text-xl font-semibold text-gray-700'>
        Trading Percentage
      </p>
      <ProgressBar value={userData.tradingPercentage} color={'#51a4f5'} />
    </Card>
  );
}
