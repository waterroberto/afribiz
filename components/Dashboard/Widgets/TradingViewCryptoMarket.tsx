'use client';
import Card from '@/components/Global/Card';
import React from 'react';
import { CryptocurrencyMarket } from 'react-tradingview-embed';

export default function TradingViewCryptoMarket() {
  return (
    <div className='padding' id='trending'>
      <Card>
        <p className='mb-8 text-2xl font-semibold text-white'>Cryptocurrency Market</p>
        <CryptocurrencyMarket
          widgetProps={{
            width: '100%',
            colorTheme: 'dark',
          }}
        />
      </Card>
    </div>
  );
}
