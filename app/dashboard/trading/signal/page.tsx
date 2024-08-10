'use client';

import React from 'react';
import BackButton from '../../components/BackButton';
import CapitalAndProfit from '../components/CapitalAndProfit';
import TradingForm from '../components/TradingForm';

export default function SignalTrading() {
  return (
    <>
      <BackButton />
      <CapitalAndProfit />
      <TradingForm />
    </>
  );
}
