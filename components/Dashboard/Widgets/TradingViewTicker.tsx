'use client';
import React from 'react';
import { TickerTape } from 'react-tradingview-embed';

export default function TradingViewTicker() {
  return (
    <div className='mb-8'>
      <TickerTape
        widgetProps={{
          showSymbolLogo: false,
          colorTheme: 'light',
        }}
      />
    </div>
  );
}
