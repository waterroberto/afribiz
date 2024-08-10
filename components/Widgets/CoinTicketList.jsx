import Script from 'next/script';
import React from 'react';

export default function CoinTicketList() {
  return (
    <div className='rounded-xl'>
      <Script src='https://widgets.coingecko.com/coingecko-coin-market-ticker-list-widget.js' />
      <coingecko-coin-market-ticker-list-widget
        coin-id='bitcoin'
        currency='usd'
        locale='en'
      ></coingecko-coin-market-ticker-list-widget>
    </div>
  );
}
