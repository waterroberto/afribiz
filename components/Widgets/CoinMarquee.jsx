import Script from 'next/script';
import React from 'react';

export default function CoinMarquee() {
  return (
    <div className='mb-8'>
      <Script src='https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js' />
      <coingecko-coin-price-marquee-widget
        coin-ids='bitcoin,ethereum,eos,ripple,litecoin'
        currency='usd'
        background-color='#ffffff'
        locale='en'
      ></coingecko-coin-price-marquee-widget>
    </div>
  );
}
