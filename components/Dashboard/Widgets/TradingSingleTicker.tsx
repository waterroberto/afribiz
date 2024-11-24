'use client';

import {  SingleTicker } from 'react-tradingview-embed';

export default function TradingSingleTicker() {
  return (
    <div className=' w-full rounded-2xl border border-gray-200 p-[0.3px] overflow-hidden'>
      <SingleTicker
        widgetProps={{
          colorTheme: "dark",
          width: "100%"
        }}
      />
    </div>
  );
}