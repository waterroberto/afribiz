'use client';
import Card from '@/components/Global/Card';
import React from 'react';
import { Timeline } from 'react-tradingview-embed';

export default function TradingViewTimeline() {
  return (
    <div className='padding' id='trending'>
      <Card>
        <p className='mb-8 text-2xl font-semibold text-white'>Crypto News</p>
        <Timeline
          widgetProps={{
            width: '100%',
            colorTheme: 'dark',
          }}
        />
      </Card>
    </div>
  );
}
