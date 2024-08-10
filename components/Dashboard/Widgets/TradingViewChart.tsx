'use client';
import React from 'react';
import { AdvancedChart } from 'react-tradingview-embed';

export default function TradingViewChart() {
  return (
    <div className='my-4'>
      <AdvancedChart
        widgetProps={{
          theme: 'light',
        }}
      />
    </div>
  );
}
