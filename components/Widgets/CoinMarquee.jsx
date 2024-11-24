import Script from 'next/script';
import React from 'react';

export default function CoinMarquee() {
  return (
    <div className='mb-8'>
      <Script src='https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js' />
      {/* <coingecko-coin-price-marquee-widget
        coin-ids='bitcoin,ethereum,eos,ripple,litecoin'
        currency='usd'
        background-color='#090d1f'
        locale='en'
      ></coingecko-coin-price-marquee-widget> */}
      <gecko-coin-price-marquee-widget  background-color='#090d1f' locale="en" dark-mode="true" transparent-background="true" outlined="true" coin-ids="bitcoin,ethereum,eos,ripple,litecoin" initial-currency="usd"></gecko-coin-price-marquee-widget>
    </div>
  );
}
